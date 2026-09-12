#!/usr/bin/env node

/**
 * Local WCAG accessibility audit.
 *
 * Uses Playwright (headless Chromium) to render each route, runs axe-core
 * against it (tagged for WCAG 2.x Level A/AA), and optionally runs Google's
 * Lighthouse accessibility category per page.
 *
 * Usage:
 *   npm run a11y                        # axe-core scan, then open a11y-report/index.html
 *   npm run a11y -- --lighthouse        # also generate Lighthouse a11y scorecards
 *   A11Y_BASE_URL=https://example.com \
 *     npm run a11y                      # scan an already-running site instead of local preview
 *
 * Exit code is non-zero when any serious/critical WCAG A/AA violation is found,
 * so it can double as a CI gate later.
 */
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { dirname, resolve } from 'node:path';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const REPORT_DIR = resolve(ROOT, 'a11y-report');

const BASE_URL = (process.env.A11Y_BASE_URL || 'http://localhost:4173').replace(
  /\/+$/,
  ''
);
const PORT = new URL(BASE_URL).port || '4173';
const WANT_LIGHTHOUSE = process.argv.includes('--lighthouse');

const ROUTES = [
  '/',
  '/services',
  '/government/city-officials',
  '/government/departments',
  '/tourism',
  '/hotlines',
  '/holidays',
  '/statistics/overview',
  '/data/weather',
  '/data/forex',
  '/terms-of-service',
  '/privacy-policy',
  '/accessibility',
  '/search',
];

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const IMPACT_ORDER = { critical: 0, serious: 1, moderate: 2, minor: 3 };

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function reachable(url) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

function spawnServer() {
  const hasBuild = existsSync(resolve(ROOT, 'dist'));
  const cmd = hasBuild ? 'preview' : 'dev';
  console.log(
    `No server detected on ${BASE_URL} - starting "npm run ${cmd}"...`
  );
  const child = spawn(
    'npm',
    ['run', cmd, '--', '--port', PORT, '--strictPort'],
    {
      cwd: ROOT,
      stdio: 'ignore',
    }
  );
  return child;
}

async function ensureServer() {
  if (await reachable(BASE_URL)) return null;
  const child = spawnServer();
  for (let i = 0; i < 60; i += 1) {
    if (await reachable(BASE_URL)) return child;
    await sleep(1000);
  }
  if (!child.killed) child.kill();
  throw new Error(
    `Timed out waiting for ${BASE_URL}. Start a server manually or set A11Y_BASE_URL.`
  );
}

function slugify(url) {
  const path =
    new URL(url).pathname === '/'
      ? 'home'
      : new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  return path || 'home';
}

async function auditPage(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 45_000 });
  await page.waitForLoadState('domcontentloaded');
  await sleep(500);

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  const violations = results.violations.map(v => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: v.help,
    helpUrl: v.helpUrl,
    tags: v.tags.filter(t => t.startsWith('wcag')),
    nodes: v.nodes.map(n => ({
      target: n.target.join(' '),
      html: n.html,
      failureSummary: n.failureSummary,
    })),
  }));

  return {
    url,
    slug: slugify(url),
    violationCount: violations.length,
    violations,
  };
}

async function runLighthouse(url) {
  let lighthouse;
  try {
    ({ default: lighthouse } = await import('lighthouse'));
  } catch {
    return null;
  }

  try {
    const chromium = await import('playwright');
    process.env.CHROME_PATH = chromium.chromium.executablePath();
  } catch {
    return null;
  }

  const slug = slugify(url);
  const htmlPath = resolve(REPORT_DIR, `lighthouse-${slug}.html`);
  const runnerResult = await lighthouse(url, {
    onlyCategories: ['accessibility'],
    output: 'html',
    outputPath: htmlPath,
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
    logLevel: 'error',
  });

  const score = runnerResult?.lhr?.categories?.accessibility?.score ?? null;
  return {
    slug,
    score: score === null ? null : Math.round(score * 100),
    reportPath: htmlPath,
  };
}

function buildReport(pageResults, lighthouseResults) {
  const perRoute = [];
  const violationsByTag = {};
  const violationsByImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  let total = 0;

  for (const page of pageResults) {
    const count = page.violations.reduce((n, v) => n + v.nodes.length, 0);
    perRoute.push({
      url: page.url,
      slug: page.slug,
      violations: count,
      seriousOrCritical: page.violations
        .filter(v => v.impact === 'critical' || v.impact === 'serious')
        .reduce((n, v) => n + v.nodes.length, 0),
      impactBreakdown: page.violations.reduce((acc, v) => {
        acc[v.impact] = (acc[v.impact] || 0) + v.nodes.length;
        return acc;
      }, {}),
    });

    for (const v of page.violations) {
      total += v.nodes.length;
      for (const t of v.tags) {
        violationsByTag[t] = (violationsByTag[t] || 0) + v.nodes.length;
      }
      if (v.impact in violationsByImpact)
        violationsByImpact[v.impact] += v.nodes.length;
    }
  }

  return {
    meta: {
      baseUrl: BASE_URL,
      wcagTags: WCAG_TAGS,
      generatedAt: new Date().toISOString(),
      lighthouseIncluded: lighthouseResults.length > 0,
    },
    summary: {
      totalViolations: total,
      byImpact: violationsByImpact,
      byTag: Object.fromEntries(
        Object.entries(violationsByTag).sort((a, b) => b[1] - a[1])
      ),
    },
    lighthouse: lighthouseResults,
    perRoute,
    pages: pageResults,
  };
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderReportHtml(report) {
  const data = JSON.stringify(report);
  const style = `
    body{font-family:system-ui,Segoe UI,Roboto,sans-serif;margin:0;background:#f6f7f9;color:#1f2937}
    header{background:#111827;color:#fff;padding:24px 32px}
    header h1{margin:0 0 4px;font-size:20px}
    header p{margin:0;color:#9ca3af;font-size:13px}
    main{max-width:960px;margin:24px auto;padding:0 16px}
    .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:24px}
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;text-align:center}
    .card .n{font-size:24px;font-weight:700}
    .card .l{font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em}
    .red{color:#dc2626}.amber{color:#d97706}.green{color:#16803c}
    .filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
    .filters select,.filters button{font:inherit;padding:6px 10px;border:1px solid #d1d5db;border-radius:6px;background:#fff}
    .page{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin-bottom:16px}
    .page h2{margin:0 0 8px;font-size:16px}
    .badge{display:inline-block;padding:2px 8px;border-radius:9999px;font-size:12px;margin-left:6px}
    .badge.crit{background:#fee2e2;color:#b91c1c}.badge.ser{background:#ffedd5;color:#c2410c}
    .badge.mod{background:#fef3c7;color:#b45309}.badge.min{background:#e0e7ff;color:#4338ca}
    details{border-top:1px solid #f3f4f6;padding:8px 0}
    summary{cursor:pointer;font-weight:600;font-size:14px}
    .impact{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
    .impact.critical{color:#b91c1c}.impact.serious{color:#c2410c}.impact.moderate{color:#b45309}.impact.minor{color:#4338ca}
    .help{font-size:13px;color:#4b5563;margin:4px 0}
    .help a{color:#2563eb;text-decoration:none}
    .node{background:#f9fafb;border:1px solid #eef0f3;border-radius:6px;padding:8px 10px;margin:6px 0;font-size:12px}
    .node code{display:block;font-family:ui-monospace,monospace;white-space:pre-wrap;word-break:break-all;background:#fff;border:1px solid #e5e7eb;border-radius:4px;padding:4px 6px;margin-top:4px}
    .tags span{display:inline-block;background:#eef2ff;color:#4338ca;border-radius:9999px;padding:1px 7px;font-size:11px;margin:2px 2px 0 0}
    .lh{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:24px}
    .lh a{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:12px;display:block;text-decoration:none;color:#1f2937;font-size:13px}
    .lh .score{font-size:20px;font-weight:700}
    .empty{color:#374151;text-align:center;padding:40px;background:#fff;border:1px solid #e5e7eb;border-radius:8px}
  `;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Accessibility Audit - BetterMaasin</title>
<style>${style}</style>
</head>
<body>
<header>
  <h1>WCAG Accessibility Audit</h1>
  <p>${escapeHtml(report.meta.baseUrl)} &middot; generated ${escapeHtml(report.meta.generatedAt)} &middot; axe-core on rendered pages${report.meta.lighthouseIncluded ? ' &middot; Lighthouse a11y scorecards' : ''}</p>
</header>
<main>
  <div class="cards">
    <div class="card"><div class="n ${report.summary.totalViolations ? 'red' : 'green'}">${report.summary.totalViolations}</div><div class="l">Total violations</div></div>
    <div class="card"><div class="n red">${report.summary.byImpact.critical}</div><div class="l">Critical</div></div>
    <div class="card"><div class="n amber">${report.summary.byImpact.serious}</div><div class="l">Serious</div></div>
    <div class="card"><div class="n">${report.summary.byImpact.moderate}</div><div class="l">Moderate</div></div>
    <div class="card"><div class="n">${report.summary.byImpact.minor}</div><div class="l">Minor</div></div>
    <div class="card"><div class="n">${report.perRoute.length}</div><div class="l">Pages audited</div></div>
  </div>
  <div class="filters">
    <select id="pageFilter"><option value="">All pages</option></select>
    <select id="impactFilter">
      <option value="">All impacts</option><option value="critical">Critical</option><option value="serious">Serious</option><option value="moderate">Moderate</option><option value="minor">Minor</option>
    </select>
    <button id="reset">Reset</button>
  </div>
  ${report.meta.lighthouseIncluded ? `<div class="lh">${report.lighthouse.map(l => `<a href="lighthouse-${escapeHtml(l.slug)}.html">${escapeHtml(l.slug)} <div class="score ${(l.score ?? 0) >= 90 ? 'green' : (l.score ?? 0) >= 50 ? 'amber' : 'red'}">${l.score === null ? 'n/a' : String(l.score) + '/100'}</div></a>`).join('')}</div>` : ''}
  <div id="pages">${report.pages
    .map(
      page => `
    <section class="page" data-page="${escapeHtml(page.slug)}">
      <h2>${escapeHtml(page.slug)} <a href="${escapeHtml(page.url)}">${escapeHtml(page.url)}</a>
        ${page.violations.map(v => `<span class="badge ${v.impact}">${escapeHtml(v.impact)}</span>`).join('') || '<span class="badge" style="background:#dcfce7;color:#16803c">no violations</span>'}
      </h2>
      ${
        page.violations.length === 0
          ? ''
          : page.violations
              .map(
                v => `
      <details class="v" data-impact="${escapeHtml(v.impact)}">
        <summary><span class="impact ${escapeHtml(v.impact)}">${escapeHtml(v.impact)}</span> ${escapeHtml(v.help)} (${v.nodes.length})</summary>
        <p class="help">${escapeHtml(v.description)} <a href="${escapeHtml(v.helpUrl)}" target="_blank" rel="noopener noreferrer">WCAG details</a></p>
        <div class="tags">${v.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
        ${v.nodes.map(n => `<div class="node">${escapeHtml(n.target || n.html)}${n.html ? `<code>${escapeHtml(n.html)}</code>` : ''}${n.failureSummary ? `<div style="color:#6b7280;margin-top:4px">${escapeHtml(n.failureSummary)}</div>` : ''}</div>`).join('')}
      </details>`
              )
              .join('')
      }
    </section>`
    )
    .join('')}
  </div>
  <noscript><p class="empty">Enable JavaScript to filter this report.</p></noscript>
</main>
<script>
const DATA = ${data};
const was = document.querySelectorAll('#pageFilter option'); if(was.length===1){DATA.pages.forEach(p=>{const o=document.createElement('option');o.value=p.slug;o.textContent=p.slug;document.getElementById('pageFilter').appendChild(o)});}
function applyFilters(){
  const page = document.getElementById('pageFilter').value;
  const impact = document.getElementById('impactFilter').value;
  document.querySelectorAll('.page').forEach(s=>{
    const showPage = !page || s.dataset.page === page;
    s.style.display = showPage ? '' : 'none';
    let any = false;
    s.querySelectorAll('details.v').forEach(d=>{
      const show = !impact || d.dataset.impact === impact;
      d.style.display = show ? '' : 'none';
      if (show) any = true;
    });
    if (showPage && !any && impact) s.style.display = 'none';
  });
}
document.getElementById('pageFilter').addEventListener('change', applyFilters);
document.getElementById('impactFilter').addEventListener('change', applyFilters);
document.getElementById('reset').addEventListener('click', ()=>{document.getElementById('pageFilter').value='';document.getElementById('impactFilter').value='';applyFilters();});
</script>
</body>
</html>`;
}

function printSummary(report) {
  const { summary, perRoute } = report;
  const hasFailures =
    summary.byImpact.critical > 0 || summary.byImpact.serious > 0;

  console.log('\n========================================');
  console.log(' WCAG A11Y AUDIT SUMMARY');
  console.log('========================================');
  console.log(` Base URL : ${report.meta.baseUrl}`);
  console.log(` Pages    : ${perRoute.length}`);
  console.log(` Findings : ${summary.totalViolations} total`);
  console.log(' By impact:');
  for (const [impact, count] of Object.entries(summary.byImpact)) {
    const icon = count
      ? impact === 'critical' || impact === 'serious'
        ? '✗'
        : '·'
      : '✓';
    console.log(`   ${icon} ${impact.padEnd(9)} ${count}`);
  }
  console.log(' By WCAG tag:');
  for (const [tag, count] of Object.entries(summary.byTag)) {
    console.log(`   ${tag} (${count})`);
  }
  console.log('\n Per page:');
  for (const p of perRoute) {
    const flag = p.seriousOrCritical ? '✗' : p.violations ? '·' : '✓';
    console.log(
      `   ${flag} ${p.slug.padEnd(28)} ${String(p.violations).padStart(3)} (${p.seriousOrCritical} serious/critical)`
    );
  }
  if (report.lighthouse.length) {
    console.log('\n Lighthouse (a11y score):');
    for (const l of report.lighthouse) {
      console.log(
        `   ${l.slug.padEnd(28)} ${l.score === null ? 'n/a' : l.score + '/100'}`
      );
    }
  }
  console.log(`\n Report : ${resolve(REPORT_DIR, 'index.html')}`);
  if (hasFailures) {
    console.log(
      ' Result : FAIL - serious/critical WCAG A/AA violations found\n'
    );
  } else if (summary.totalViolations) {
    console.log(' Result : WARN - only moderate/minor violations found\n');
  } else {
    console.log(' Result : PASS - no violations found on audited routes\n');
  }
}

async function main() {
  mkdirSync(REPORT_DIR, { recursive: true });

  let serverChild = null;
  if (process.env.A11Y_BASE_URL) {
    console.log(
      `Auditing ${BASE_URL} (external URL, not managing a local server)`
    );
  } else {
    serverChild = await ensureServer();
  }

  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-gpu'],
    });
    const context = await browser.newContext();

    const pageResults = [];
    for (const route of ROUTES) {
      const url = BASE_URL + route;
      const label = slugify(url);
      process.stdout.write(`  auditing ${label} ... `);
      try {
        const page = await context.newPage();
        const result = await auditPage(page, url);
        pageResults.push(result);
        console.log(
          `${result.violations.length ? result.violationCount + ' violation(s)' : 'clean'}`
        );
        await page.close();
      } catch (err) {
        console.log(`ERROR (${err.message})`);
        pageResults.push({
          url,
          slug: label,
          violationCount: 0,
          violations: [],
          auditError: String(err.message || err),
        });
      }
    }

    await browser.close();

    const lighthouseScores = [];
    if (WANT_LIGHTHOUSE) {
      console.log(
        '\nRunning Lighthouse accessibility audits (one per page)...'
      );
      for (const route of ROUTES) {
        const url = BASE_URL + route;
        const label = slugify(url);
        process.stdout.write(`  lighthouse ${label} ... `);
        try {
          const result = await runLighthouse(url);
          if (result) {
            lighthouseScores.push(result);
            console.log(
              `${result.score === null ? 'n/a' : result.score + '/100'}`
            );
          } else {
            console.log('skipped (Lighthouse unavailable)');
          }
        } catch (err) {
          console.log(`ERROR (${err.message})`);
        }
      }
    }

    const report = buildReport(pageResults, lighthouseScores);
    writeFileSync(
      resolve(REPORT_DIR, 'report.json'),
      JSON.stringify(report, null, 2)
    );
    writeFileSync(resolve(REPORT_DIR, 'index.html'), renderReportHtml(report));
    printSummary(report);

    const failed =
      report.summary.byImpact.critical > 0 ||
      report.summary.byImpact.serious > 0;
    process.exitCode = failed ? 1 : 0;
  } finally {
    if (serverChild && !serverChild.killed) {
      serverChild.kill();
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

// scripts/build-maasin-flood-control.ts
// Generates src/data/flood_control/maasin_flood_control.json — a flat, Maasin-only
// subset of the national flood control dataset, so the flood control pages can
// run entirely client-side (no Meilisearch backend needed on static hosting).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_PATH = path.join(
  __dirname,
  '../src/data/flood_control/flood_control.json'
);
const OUT_PATH = path.join(
  __dirname,
  '../src/data/flood_control/maasin_flood_control.json'
);

const MAASIN_MUNICIPALITY = 'CITY OF MAASIN (CAPITAL) (SOUTHERN LEYTE)';
const MAASIN_PROVINCE = 'SOUTHERN LEYTE';

interface Feature {
  attributes: Record<string, unknown>;
}

function buildSlug(description: unknown, contractId: unknown): string {
  if (!description) return '';
  const baseSlug = String(description)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
  return contractId
    ? `${baseSlug}-${String(contractId).toLowerCase()}`
    : baseSlug;
}

function main(): void {
  const raw: { features?: Feature[] } = JSON.parse(
    fs.readFileSync(SRC_PATH, 'utf8')
  );
  const features = raw.features ?? [];

  const maasin = features
    .filter(
      feature =>
        (feature.attributes?.Municipality || '').trim().toUpperCase() ===
          MAASIN_MUNICIPALITY &&
        (feature.attributes?.Province || '').trim().toUpperCase() ===
          MAASIN_PROVINCE
    )
    .map(feature => {
      const attributes = { ...feature.attributes };
      attributes.type = 'flood_control';
      attributes.slug = buildSlug(
        attributes.ProjectDescription,
        attributes.ContractID
      );
      return attributes;
    });

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(maasin, null, 2), 'utf8');
  console.log(
    `[build-maasin-flood-control] wrote ${maasin.length} Maasin records to ${OUT_PATH}`
  );
}

main();

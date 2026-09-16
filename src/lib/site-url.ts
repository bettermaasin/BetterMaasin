const ENV_SITE_URL = import.meta.env.VITE_SITE_URL as string | undefined;

export const getSiteUrl = (): string => {
  if (ENV_SITE_URL) return ENV_SITE_URL.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
};

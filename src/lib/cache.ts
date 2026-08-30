const CACHE_PREFIX = 'bettergov:';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export function cacheGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (typeof entry.expiresAt === 'number' && entry.expiresAt < Date.now()) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return entry.value;
  } catch {
    return null;
  }
}

export function cacheSet<T>(key: string, value: T, ttlMs: number): void {
  try {
    const entry: CacheEntry<T> = {
      value,
      expiresAt: Date.now() + ttlMs,
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // Ignore write failures (e.g. storage quota / private mode)
  }
}

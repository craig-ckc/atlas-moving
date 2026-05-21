const PREFIX = 'moving-form';
const VERSION = 'v1';

const key = (k: string) => `${PREFIX}:${k}:${VERSION}`;

export const StorageKeys = {
  draft: key('draft'),
  submissions: key('submissions'),
  adminSession: key('admin'),
  seeded: key('seeded'),
} as const;

export function readJSON<T>(k: string): T | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.localStorage.getItem(k);
    if (raw == null) return undefined;
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export function writeJSON<T>(k: string, value: T) {
  try {
    window.localStorage.setItem(k, JSON.stringify(value));
  } catch {
    // Quota exceeded — surface to the caller if you need to. Quiet for now;
    // the photo path uses IndexedDB so this should be cheap.
  }
}

export function clearKey(k: string) {
  try {
    window.localStorage.removeItem(k);
  } catch {
    // ignore
  }
}

const SanitizedString = "Sanitized";

export type Sanitized<T> = T & { __brand: typeof SanitizedString };

export function isSanitized<T extends object>(
  obj: T | Sanitized<T>,
): obj is Sanitized<T> {
  if (obj == null) return false;

  if (!("__brand" in obj)) return false;

  return obj["__brand"] === SanitizedString;
}

export function sanitizeRecursive<T extends object>(
  obj: T | Sanitized<T>,
): Sanitized<T> {
  if (isSanitized(obj)) return obj;

  const cloned: Record<string, any> = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key];

      if (value != null && typeof value === "object") {
        cloned[key] = sanitizeRecursive(value as T);
      } else if (typeof value === "string") {
        cloned[key] = sanitizeString(value);
      } else if (typeof value === "number") {
        cloned[key] = sanitizeNumber(value);
      } else {
        cloned[key] = value;
      }
    }
  }

  cloned.__brand = SanitizedString;
  return cloned as Sanitized<T>;
}

// Mock implementation for testing purpose
function sanitizeString(str: string): string {
  return str.length >= 2 ? str : "N/A";
}

// Dummy implementation for testing purpose
function sanitizeNumber(num: number): number {
  return Math.min(Math.max(num, 0), 3000);
}

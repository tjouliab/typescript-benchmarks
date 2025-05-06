export function deepCopy<T>(array: T[]): T[] {
  return array.map((item) => deepCloneValue(item));
}

function deepCloneValue<T>(value: T): T {
  if (Array.isArray(value)) {
    // Clone each array element
    return value.map((element) => deepCloneValue(element)) as unknown as T;
  } else if (value !== null && typeof value === "object") {
    // Clone each property of plain object
    const cloned: Record<string, any> = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        cloned[key] = deepCloneValue((value as Record<string, unknown>)[key]);
      }
    }
    return cloned as T;
  } else {
    // Primitive values (string, number, boolean, null, undefined, etc.) are returned as is
    return value;
  }
}
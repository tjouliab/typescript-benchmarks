/**
 * A class that manages a set of objects with unique identifiers.
 *
 * @template T - The type of objects to be stored in the set.
 * @template U - The type of the unique identifier for the objects, which can be either a string or a number.
 */
export class SetObjects<T extends object, U extends string | number> {
  /**
   * A function that generates a unique identifier for an object.
   */
  private readonly hashFn: (obj: T) => U;

  /**
   * A map that stores the objects with their unique identifiers.
   */
  private readonly objectsMap: Map<U, T> = new Map();

  /**
   * Creates an instance of SetObjects.
   *
   * @param objects - An array of objects to be initially added to the set.
   * @param fn - A function that generates a unique identifier for an object.
   */
  constructor(objects: T[], fn: (obj: T) => U) {
    this.hashFn = fn;
    for (const obj of objects) {
      this.add(obj);
    }
  }

  /**
   * Adds an object to the set.
   *
   * @param obj - The object to be added.
   */
  add(obj: T): void {
    this.objectsMap.set(this.hashFn(obj), obj);
  }

  /**
   * Checks if an object is in the set.
   *
   * @param obj - The object to be checked.
   * @returns `true` if the object is in the set, otherwise `false`.
   */
  has(obj: T): boolean {
    return this.objectsMap.has(this.hashFn(obj));
  }

  /**
   * Deletes an object from the set.
   *
   * @param obj - The object to be deleted.
   */
  delete(obj: T): void {
    this.objectsMap.delete(this.hashFn(obj));
  }

  /**
   * Make the collection iterable (for ... of).
   */
  [Symbol.iterator](): IterableIterator<T> {
    return this.objectsMap.values();
  }
}

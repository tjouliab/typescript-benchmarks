export class SetObjectsComp<T, Fn extends (item: T) => string | number> {
  /** Sorted array */
  private readonly set: T[] = [];

  private readonly compFn: Fn;

  /**
   * Creates an instance of {@link SetObjectsComp}.
   *
   * @param arr - An array of objects to be initially added to the set.
   * @param fn - A function that extract a value to compare objects.
   */
  constructor(arr: T[], fn: Fn) {
    this.compFn = fn;
    for (const item of arr) {
      this.add(item);
    }
  }

  private _find(item: T): { found: boolean; index: number } {
    const refValue = this.compFn(item);

    let minIndex = 0;
    let maxIndex = this.set.length - 1;

    while (minIndex <= maxIndex) {
      const meanIndex = (maxIndex + minIndex) >> 1;
      const meanValue = this.compFn(this.set[meanIndex]);

      if (meanValue === refValue) {
        return { found: true, index: meanIndex };
      } else if (meanValue < refValue) {
        // Move to right side
        minIndex = meanIndex + 1;
      } else {
        // Move to left side
        maxIndex = meanIndex - 1;
      }
    }

    return { found: false, index: minIndex };
  }

  /**
   * Adds an item to the set.
   *
   * @param item - The item to be added.
   */
  public add(item: T): void {
    const { found, index } = this._find(item);
    if (!found) {
      this.set.splice(index, 0, item);
    }
  }

  /**
   * Checks if an item is in the set.
   *
   * @param item - The item to be checked.
   * @returns `true` if the object is in the set, otherwise `false`.
   */
  has(item: T): boolean {
    return this._find(item).found;
  }

  /**
   * Deletes an item from the set.
   *
   * @param obj - The item to be deleted.
   */
  delete(item: T): void {
    const { found, index } = this._find(item);
    if (found) {
      this.set.splice(index, 1);
    }
  }

  public toList(): T[] {
    return this.set;
  }
}

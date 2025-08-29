export abstract class ArrayUtils {
  static shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  static sliceRandomly<T>(
    list: T[],
    slice: number,
    compareFn?: (item1: T, item2: T) => number
  ): T[] {
    const shuffled = ArrayUtils.shuffle(list);
    const sliced = shuffled.slice(list.length - slice);
    if (compareFn) {
      return sliced.sort(compareFn);
    }
    return sliced.sort((item1, item2) => (item1 <= item2 ? -1 : 1));
  }
}

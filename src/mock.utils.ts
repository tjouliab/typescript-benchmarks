import { shuffle } from "./array.utils";

export type MockObjectSimple = {
  id: number;
  idString: string;
};

export type MockObjectComplex = MockObjectSimple & {
  obj: MockObjectSimple;
  listObj: MockObjectSimple[];
};

export abstract class MockUtils {
  static generateSimple(count: number): MockObjectSimple[] {
    return shuffle(
      [...Array(count).keys()].map((i) => {
        return {
          id: i % 1000,
          idString: `${i % 1000}`,
        };
      })
    );
  }

  static generateComplex(count: number): MockObjectComplex[] {
    return shuffle(
      [...Array(count).keys()].map((i) => {
        return {
          id: i % 1000,
          idString: `${i % 1000}`,
          obj: this.generateSimple(1)[0],
          listObj: this.generateSimple(Math.floor(count / 10)),
        };
      })
    );
  }
}

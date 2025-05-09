import { SetObjectsComp } from "./set-objects-comp";

describe("SetObjectsComp", () => {
  interface TestObject {
    id: number;
    name: string;
    data: number[];
  }

  describe("Comparison function based on id", () => {
    const compFn = (obj: TestObject) => obj.id;

    let setObjectsComp: SetObjectsComp<TestObject, (obj: TestObject) => number>;

    beforeEach(() => {
      setObjectsComp = new SetObjectsComp([], compFn);
    });

    it("should add an object to the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjectsComp.add(obj);
      expect(setObjectsComp.has(obj)).toBe(true);
    });

    it("should check if an object is in the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjectsComp.add(obj);
      expect(setObjectsComp.has(obj)).toBe(true);
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      expect(setObjectsComp.has(obj2)).toBe(false);
    });

    it("should delete an object from the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjectsComp.add(obj);
      setObjectsComp.delete(obj);
      expect(setObjectsComp.has(obj)).toBe(false);
    });

    it("should return all objects in the set", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      const obj3: TestObject = { id: 3, name: "Object 3", data: [3, 3, 3] };
      const obj4: TestObject = { id: 4, name: "Object 4", data: [4, 4, 4] };
      const obj5: TestObject = { id: 5, name: "Object 5", data: [5, 5, 5] };
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj5);
      expect(setObjectsComp.toList()).toEqual([obj1, obj2, obj3, obj4, obj5]);
    });

    it("should return all objects in the set - reversed", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      const obj3: TestObject = { id: 3, name: "Object 3", data: [3, 3, 3] };
      const obj4: TestObject = { id: 4, name: "Object 4", data: [4, 4, 4] };
      const obj5: TestObject = { id: 5, name: "Object 5", data: [5, 5, 5] };
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj1);
      expect(setObjectsComp.toList()).toEqual([obj1, obj2, obj3, obj4, obj5]);
    });

    it("should return all objects in the set - shuffled", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      const obj3: TestObject = { id: 3, name: "Object 3", data: [3, 3, 3] };
      const obj4: TestObject = { id: 4, name: "Object 4", data: [4, 4, 4] };
      const obj5: TestObject = { id: 5, name: "Object 5", data: [5, 5, 5] };
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj1);
      expect(setObjectsComp.toList()).toEqual([obj1, obj2, obj3, obj4, obj5]);
    });
  });

  describe("Comparison function based on name", () => {
    const compFn = (obj: TestObject) => obj.name;

    let setObjectsComp: SetObjectsComp<TestObject, (obj: TestObject) => string>;

    beforeEach(() => {
      setObjectsComp = new SetObjectsComp([], compFn);
    });

    it("should add an object to the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjectsComp.add(obj);
      expect(setObjectsComp.has(obj)).toBe(true);
    });

    it("should check if an object is in the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjectsComp.add(obj);
      expect(setObjectsComp.has(obj)).toBe(true);
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      expect(setObjectsComp.has(obj2)).toBe(false);
    });

    it("should delete an object from the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjectsComp.add(obj);
      setObjectsComp.delete(obj);
      expect(setObjectsComp.has(obj)).toBe(false);
    });

    it("should return all objects in the set", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      const obj3: TestObject = { id: 3, name: "Object 3", data: [3, 3, 3] };
      const obj4: TestObject = { id: 4, name: "Object 4", data: [4, 4, 4] };
      const obj5: TestObject = { id: 5, name: "Object 5", data: [5, 5, 5] };
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj5);
      expect(setObjectsComp.toList()).toEqual([obj1, obj2, obj3, obj4, obj5]);
    });

    it("should return all objects in the set - reversed", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      const obj3: TestObject = { id: 3, name: "Object 3", data: [3, 3, 3] };
      const obj4: TestObject = { id: 4, name: "Object 4", data: [4, 4, 4] };
      const obj5: TestObject = { id: 5, name: "Object 5", data: [5, 5, 5] };
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj1);
      expect(setObjectsComp.toList()).toEqual([obj1, obj2, obj3, obj4, obj5]);
    });

    it("should return all objects in the set - shuffled", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      const obj3: TestObject = { id: 3, name: "Object 3", data: [3, 3, 3] };
      const obj4: TestObject = { id: 4, name: "Object 4", data: [4, 4, 4] };
      const obj5: TestObject = { id: 5, name: "Object 5", data: [5, 5, 5] };
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj1);
      expect(setObjectsComp.toList()).toEqual([obj1, obj2, obj3, obj4, obj5]);
    });
  });

  describe("Comparison function based on data", () => {
    const compFn = (obj: TestObject) =>
      obj.data.reduce((acc, val) => {
        return acc + val;
      }, 0);

    let setObjectsComp: SetObjectsComp<TestObject, (obj: TestObject) => number>;

    beforeEach(() => {
      setObjectsComp = new SetObjectsComp([], compFn);
    });

    it("should add an object to the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjectsComp.add(obj);
      expect(setObjectsComp.has(obj)).toBe(true);
    });

    it("should check if an object is in the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjectsComp.add(obj);
      expect(setObjectsComp.has(obj)).toBe(true);
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      expect(setObjectsComp.has(obj2)).toBe(false);
    });

    it("should delete an object from the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjectsComp.add(obj);
      setObjectsComp.delete(obj);
      expect(setObjectsComp.has(obj)).toBe(false);
    });

    it("should return all objects in the set", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      const obj3: TestObject = { id: 3, name: "Object 3", data: [3, 3, 3] };
      const obj4: TestObject = { id: 4, name: "Object 4", data: [4, 4, 4] };
      const obj5: TestObject = { id: 5, name: "Object 5", data: [5, 5, 5] };
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj5);
      expect(setObjectsComp.toList()).toEqual([obj1, obj2, obj3, obj4, obj5]);
    });

    it("should return all objects in the set - reversed", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      const obj3: TestObject = { id: 3, name: "Object 3", data: [3, 3, 3] };
      const obj4: TestObject = { id: 4, name: "Object 4", data: [4, 4, 4] };
      const obj5: TestObject = { id: 5, name: "Object 5", data: [5, 5, 5] };
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj1);
      expect(setObjectsComp.toList()).toEqual([obj1, obj2, obj3, obj4, obj5]);
    });

    it("should return all objects in the set - shuffled", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      const obj3: TestObject = { id: 3, name: "Object 3", data: [3, 3, 3] };
      const obj4: TestObject = { id: 4, name: "Object 4", data: [4, 4, 4] };
      const obj5: TestObject = { id: 5, name: "Object 5", data: [5, 5, 5] };
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj1);
      setObjectsComp.add(obj5);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj3);
      setObjectsComp.add(obj2);
      setObjectsComp.add(obj4);
      setObjectsComp.add(obj1);
      expect(setObjectsComp.toList()).toEqual([obj1, obj2, obj3, obj4, obj5]);
    });
  });
});

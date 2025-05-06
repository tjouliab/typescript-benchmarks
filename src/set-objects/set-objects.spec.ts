import { SetObjects } from "./set-objects";

describe("SetObjects", () => {
  interface TestObject {
    id: number;
    name: string;
    data: number[];
  }

  describe("Hashing function based on id", () => {
    const hashFn = (obj: TestObject) => obj.id;

    let setObjects: SetObjects<TestObject, number>;

    beforeEach(() => {
      setObjects = new SetObjects<TestObject, number>([], hashFn);
    });

    it("should add an object to the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjects.add(obj);
      expect(setObjects.has(obj)).toBe(true);
    });

    it("should check if an object is in the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjects.add(obj);
      expect(setObjects.has(obj)).toBe(true);
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      expect(setObjects.has(obj2)).toBe(false);
    });

    it("should delete an object from the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjects.add(obj);
      setObjects.delete(obj);
      expect(setObjects.has(obj)).toBe(false);
    });

    it("should return all objects in the set", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      setObjects.add(obj1);
      setObjects.add(obj2);
      expect([...setObjects]).toEqual([obj1, obj2]);
    });

    it("should initialize with an array of objects", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      setObjects = new SetObjects<TestObject, number>([obj1, obj2], hashFn);
      expect(setObjects.has(obj1)).toBe(true);
      expect(setObjects.has(obj2)).toBe(true);
    });
  });

  describe("Hashing function based on name", () => {
    const hashFn = (obj: TestObject) => obj.name;

    let setObjects: SetObjects<TestObject, string>;

    beforeEach(() => {
      setObjects = new SetObjects<TestObject, string>([], hashFn);
    });

    it("should add an object to the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjects.add(obj);
      expect(setObjects.has(obj)).toBe(true);
    });

    it("should check if an object is in the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjects.add(obj);
      expect(setObjects.has(obj)).toBe(true);
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      expect(setObjects.has(obj2)).toBe(false);
    });

    it("should delete an object from the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjects.add(obj);
      setObjects.delete(obj);
      expect(setObjects.has(obj)).toBe(false);
    });

    it("should return all objects in the set", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      setObjects.add(obj1);
      setObjects.add(obj2);
      expect([...setObjects]).toEqual([obj1, obj2]);
    });

    it("should initialize with an array of objects", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      setObjects = new SetObjects<TestObject, string>([obj1, obj2], hashFn);
      expect(setObjects.has(obj1)).toBe(true);
      expect(setObjects.has(obj2)).toBe(true);
    });
  });

  describe("Hashing function based on data", () => {
    const hashFn = (obj: TestObject) =>
      obj.data.reduce((acc, val) => {
        return acc + val;
      }, 0);

    let setObjects: SetObjects<TestObject, number>;

    beforeEach(() => {
      setObjects = new SetObjects<TestObject, number>([], hashFn);
    });

    it("should add an object to the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjects.add(obj);
      expect(setObjects.has(obj)).toBe(true);
    });

    it("should check if an object is in the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjects.add(obj);
      expect(setObjects.has(obj)).toBe(true);
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      expect(setObjects.has(obj2)).toBe(false);
    });

    it("should delete an object from the set", () => {
      const obj: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      setObjects.add(obj);
      setObjects.delete(obj);
      expect(setObjects.has(obj)).toBe(false);
    });

    it("should return all objects in the set", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      setObjects.add(obj1);
      setObjects.add(obj2);
      expect([...setObjects]).toEqual([obj1, obj2]);
    });

    it("should initialize with an array of objects", () => {
      const obj1: TestObject = { id: 1, name: "Object 1", data: [1, 1, 1] };
      const obj2: TestObject = { id: 2, name: "Object 2", data: [2, 2, 2] };
      setObjects = new SetObjects<TestObject, number>([obj1, obj2], hashFn);
      expect(setObjects.has(obj1)).toBe(true);
      expect(setObjects.has(obj2)).toBe(true);
    });
  });
});

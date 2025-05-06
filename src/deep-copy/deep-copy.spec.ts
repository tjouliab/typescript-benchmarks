import { deepCopy } from "./deep-copy";

describe("deepCopy", () => {
  it("should copy a plain number list", () => {
    const arr = [1, 2, 3];
    const copy = deepCopy(arr);
    copy[0] = 4;
    expect(arr).toEqual([1, 2, 3]);
    expect(copy).toEqual([4, 2, 3]);
  });

  it("should copy a plain string list", () => {
    const arr = ["1", "2", "3"];
    const copy = deepCopy(arr);
    copy[0] = "4";
    expect(arr).toEqual(["1", "2", "3"]);
    expect(copy).toEqual(["4", "2", "3"]);
  });

  it("should deep copy an object list", () => {
    const arr = [{ a: "a" }, { a: "a" }, { a: "a" }];
    const copy = deepCopy(arr);
    copy[0].a = "b";
    expect(arr).toEqual([{ a: "a" }, { a: "a" }, { a: "a" }]);
    expect(copy).toEqual([{ a: "b" }, { a: "a" }, { a: "a" }]);
  });

  it("should deep copy a multilevel object list", () => {
    const arr = [{ a: { b: { c: "c" } } }];
    const copy = deepCopy(arr);
    copy[0].a.b.c = "d";
    expect(arr).toEqual([{ a: { b: { c: "c" } } }]);
    expect(copy).toEqual([{ a: { b: { c: "d" } } }]);
  });

  it("should deep copy a number list object list", () => {
    const arr = [{ list: [1, 2, 3] }];
    const copy = deepCopy(arr);
    copy[0].list.push(4);
    expect(arr).toEqual([{ list: [1, 2, 3] }]);
    expect(copy).toEqual([{ list: [1, 2, 3, 4] }]);
  });

  it("should deep copy an object list object list", () => {
    const arr = [{ list: [{ a: "a" }, { a: "a" }, { a: "a" }] }];
    const copy = deepCopy(arr);
    copy[0].list[0].a = "b";
    expect(arr).toEqual([{ list: [{ a: "a" }, { a: "a" }, { a: "a" }] }]);
    expect(copy).toEqual([{ list: [{ a: "b" }, { a: "a" }, { a: "a" }] }]);
  });
});

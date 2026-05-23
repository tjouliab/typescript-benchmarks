import { interpolate } from "./interpolate";

describe("interpolate", () => {
  it("should handle empty title", () => {
    const title = "";
    const context = {};
    const result = interpolate(title, context);
    const expected = "";
    expect(result).toEqual(expected);
  });

  it("should handle title with no interpolation", () => {
    const title = "This is a plain text";
    const context = {};
    const result = interpolate(title, context);
    const expected = title;
    expect(result).toEqual(expected);
  });

  it("should handle an empty context", () => {
    const title = "This is my favorite formula: {{formulaName}}";
    const context = {};
    const result = interpolate(title, context);
    const expected = "This is my favorite formula: ???";
    expect(result).toEqual(expected);
  });

  it("should handle multiple entries", () => {
    const title =
      "This is my favorite formula: {{formulaName}}. This is my favorite machine: {{machineName}}.";
    const context = { formulaName: "efficiency", machineName: "blower" };
    const result = interpolate(title, context);
    const expected =
      "This is my favorite formula: efficiency. This is my favorite machine: blower.";
    expect(result).toEqual(expected);
  });
});




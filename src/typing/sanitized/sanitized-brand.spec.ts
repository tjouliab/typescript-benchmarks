import { isSanitized, sanitizeRecursive } from "./sanitized-brand";

type Birth = {
  year: number;
  month: number;
  day: number;
};

type Form = {
  email: string;
  name: string;
  birth: Birth;
};

const recursiveWrapper = {
  sanitizeRecursive,
};

describe("sanitizeRecursive & isSanitized", () => {
  it("should handle null", () => {
    const obj = null as unknown as object;

    const result = sanitizeRecursive(obj);

    expect(isSanitized(obj)).toEqual(false);
    expect(isSanitized(result)).toEqual(true);
    expect(result).toMatchInlineSnapshot(`
{
  "__brand": "Sanitized",
}
`);
  });

  it("should handle nested null", () => {
    const form: Form = {
      email: "",
      name: "John",
      birth: null as unknown as Birth,
    };

    const result = sanitizeRecursive(form);

    expect(isSanitized(form)).toEqual(false);
    expect(isSanitized(result)).toEqual(true);
    expect(result).toMatchInlineSnapshot(`
{
  "__brand": "Sanitized",
  "birth": null,
  "email": "N/A",
  "name": "John",
}
`);
  });

  it("should handle empty object", () => {
    const obj = {};

    const result = sanitizeRecursive(obj);

    expect(isSanitized(obj)).toEqual(false);
    expect(isSanitized(result)).toEqual(true);
    expect(result).toMatchInlineSnapshot(`
{
  "__brand": "Sanitized",
}
`);
  });

  it("should sanitize a plain object", () => {
    const birth: Birth = {
      year: 2000,
      month: 4,
      day: -1,
    };

    const result = sanitizeRecursive(birth);

    expect(isSanitized(birth)).toEqual(false);
    expect(isSanitized(result)).toEqual(true);
    expect(result).toMatchInlineSnapshot(`
{
  "__brand": "Sanitized",
  "day": 0,
  "month": 4,
  "year": 2000,
}
`);
  });

  it("should sanitize a nested object", () => {
    const birth: Birth = {
      year: 2000,
      month: 4,
      day: -1,
    };

    const form: Form = {
      email: "",
      name: "John",
      birth,
    };

    const result = sanitizeRecursive(form);

    expect(isSanitized(birth)).toEqual(false);
    expect(isSanitized(form)).toEqual(false);
    expect(isSanitized(result)).toEqual(true);
    expect(isSanitized(result.birth)).toEqual(true);
    expect(result).toMatchInlineSnapshot(`
{
  "__brand": "Sanitized",
  "birth": {
    "__brand": "Sanitized",
    "day": 0,
    "month": 4,
    "year": 2000,
  },
  "email": "N/A",
  "name": "John",
}
`);
  });

  it("should handle a sanitized plain object", () => {
    const birth: Birth = {
      year: 2000,
      month: 4,
      day: -1,
    };

    const birthSanitized = sanitizeRecursive(birth);
    const result = sanitizeRecursive(birthSanitized);

    expect(isSanitized(birthSanitized)).toEqual(true);
    expect(isSanitized(result)).toEqual(true);
    expect(result).toMatchInlineSnapshot(`
{
  "__brand": "Sanitized",
  "day": 0,
  "month": 4,
  "year": 2000,
}
`);
  });

  it("should handle a sanitized nested object", () => {
    const birth: Birth = {
      year: 2000,
      month: 4,
      day: -1,
    };

    const form: Form = {
      email: "",
      name: "John",
      birth,
    };

    const formSanitized = sanitizeRecursive(form);
    const result = sanitizeRecursive(formSanitized);

    expect(isSanitized(formSanitized)).toEqual(true);
    expect(isSanitized(formSanitized.birth)).toEqual(true);
    expect(isSanitized(result)).toEqual(true);
    expect(isSanitized(result.birth)).toEqual(true);
    expect(result).toMatchInlineSnapshot(`
{
  "__brand": "Sanitized",
  "birth": {
    "__brand": "Sanitized",
    "day": 0,
    "month": 4,
    "year": 2000,
  },
  "email": "N/A",
  "name": "John",
}
`);
  });

  it("should handle a partialy sanitized nested object", () => {
    const birth: Birth = {
      year: 2000,
      month: 4,
      day: -1,
    };

    const birthSanitized = sanitizeRecursive(birth);

    const formPartialySanitized: Form = {
      email: "",
      name: "John",
      birth: birthSanitized,
    };

    const result = sanitizeRecursive(formPartialySanitized);

    expect(isSanitized(formPartialySanitized)).toEqual(false);
    expect(isSanitized(formPartialySanitized.birth)).toEqual(true);
    expect(isSanitized(result)).toEqual(true);
    expect(isSanitized(result.birth)).toEqual(true);
    expect(result).toMatchInlineSnapshot(`
{
  "__brand": "Sanitized",
  "birth": {
    "__brand": "Sanitized",
    "day": 0,
    "month": 4,
    "year": 2000,
  },
  "email": "N/A",
  "name": "John",
}
`);
  });
});

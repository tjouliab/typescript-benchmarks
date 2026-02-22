import { BigNumberBigint } from "./big-number-bigint";

describe("constructor", () => {
  it("should create a small integer", () => {
    const bigNumber = new BigNumberBigint(123n);
    const result = bigNumber.toString();
    const expected = "123";
    expect(result).toEqual(expected);
  });

  it("should create a mid integer", () => {
    const bigNumber = new BigNumberBigint(123_456_789n);
    const result = bigNumber.toString();
    const expected = "123456789";
    expect(result).toEqual(expected);
  });

  it("should create a long integer", () => {
    const bigNumber = new BigNumberBigint(123_456_789_123_456_789_123_456_789n);
    const result = bigNumber.toString();
    const expected = "123456789123456789123456789";
    expect(result).toEqual(expected);
  });
});

describe("add", () => {
  it("should add two long integers", () => {
    const bigNumber1 = new BigNumberBigint(
      123_456_789_123_456_789_123_456_789n,
    );
    const bigNumber2 = new BigNumberBigint(
      987_654_321_987_654_321_987_654_321n,
    );
    const result = bigNumber1.add(bigNumber2).toString();
    const expected = "1111111111111111111111111110";

    expect(result).toEqual(expected);
  });
});

describe("multiply", () => {
  it("should multiply two long integers", () => {
    const bigNumber1 = new BigNumberBigint(
      123_456_789_123_456_789_123_456_789n,
    );
    const bigNumber2 = new BigNumberBigint(
      987_654_321_987_654_321_987_654_321n,
    );
    const result = bigNumber1.multiply(bigNumber2).toString();
    const expected = "121932631356500531591068431581771069347203169112635269";

    expect(result).toEqual(expected);
  });
});

describe("toScientificNotation", () => {
  it("should handle one digit number", () => {
    const bigNumber = new BigNumberBigint(1n);
    const expected = "1.00E0";
    const result = bigNumber.toScientificNotation();
    expect(result).toEqual(expected);
  });

  it("should handle two digits number", () => {
    const bigNumber = new BigNumberBigint(12n);
    const expected = "1.20E1";
    const result = bigNumber.toScientificNotation();
    expect(result).toEqual(expected);
  });

  it("should handle three digits number", () => {
    const bigNumber = new BigNumberBigint(123n);
    const expected = "1.23E2";
    const result = bigNumber.toScientificNotation();
    expect(result).toEqual(expected);
  });

  it("should handle height digits number", () => {
    const bigNumber = new BigNumberBigint(123_456_789n);
    const expected = "1.23E8";
    const result = bigNumber.toScientificNotation();
    expect(result).toEqual(expected);
  });
});

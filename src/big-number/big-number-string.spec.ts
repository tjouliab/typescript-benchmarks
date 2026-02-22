import { BigNumberString } from "./big-number-string";

describe("constructor", () => {
  it("should create a small integer", () => {
    const bigNumber = new BigNumberString("123");
    const result = bigNumber.toString();
    const expected = "123";
    expect(result).toEqual(expected);
  });

  it("should create a mid integer", () => {
    const bigNumber = new BigNumberString("123456789");
    const result = bigNumber.toString();
    const expected = "123456789";
    expect(result).toEqual(expected);
  });

  it("should create a long integer", () => {
    const bigNumber = new BigNumberString("123456789123456789123456789");
    const result = bigNumber.toString();
    const expected = "123456789123456789123456789";
    expect(result).toEqual(expected);
  });
});

describe("add", () => {
  it("should add two small integers without carry", () => {
    const bigNumber1 = new BigNumberString("1");
    const bigNumber2 = new BigNumberString("2");
    const result = bigNumber1.add(bigNumber2).toString();
    const expected = "3";

    expect(result).toEqual(expected);
  });

  it("should add two small integers with carry", () => {
    const bigNumber1 = new BigNumberString("5");
    const bigNumber2 = new BigNumberString("7");
    const result = bigNumber1.add(bigNumber2).toString();
    const expected = "12";

    expect(result).toEqual(expected);
  });
  
  it("should add two long integers", () => {
    const bigNumber1 = new BigNumberString("123456789123456789123456789");
    const bigNumber2 = new BigNumberString("987654321987654321987654321");
    const result = bigNumber1.add(bigNumber2).toString();
    const expected = "1111111111111111111111111110";

    expect(result).toEqual(expected);
  });
});

describe("multiply", () => {
  it("should multiply two long integers", () => {
    const bigNumber1 = new BigNumberString(
      "123456789123456789123456789",
    );
    const bigNumber2 = new BigNumberString(
      "987654321987654321987654321",
    );
    const result = bigNumber1.multiply(bigNumber2).toString();
    const expected = "121932631356500531591068431581771069347203169112635269";

    expect(result).toEqual(expected);
  });
});

describe("toScientificNotation", () => {
  it("should handle one digit number", () => {
    const bigNumber = new BigNumberString("1");
    const expected = "1.00E0";
    const result = bigNumber.toScientificNotation();
    expect(result).toEqual(expected);
  });

  it("should handle two digits number", () => {
    const bigNumber = new BigNumberString("12");
    const expected = "1.20E1";
    const result = bigNumber.toScientificNotation();
    expect(result).toEqual(expected);
  });

  it("should handle three digits number", () => {
    const bigNumber = new BigNumberString("123");
    const expected = "1.23E2";
    const result = bigNumber.toScientificNotation();
    expect(result).toEqual(expected);
  });

  it("should handle height digits number", () => {
    const bigNumber = new BigNumberString("123456789");
    const expected = "1.23E8";
    const result = bigNumber.toScientificNotation();
    expect(result).toEqual(expected);
  });
});

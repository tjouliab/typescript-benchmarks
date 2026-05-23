import { BigNumberBase } from "./big-number-base";

export class BigNumberString extends BigNumberBase<`${number}`> {
  add(bigNumber: BigNumberString): BigNumberString {
    const maxDigitsCount = Math.max(
      this.getDigitCount(),
      bigNumber.getDigitCount(),
    );

    const resultDigits: number[] = new Array(maxDigitsCount + 1);
    let carry: number = 0;
    for (let i = maxDigitsCount - 1; i >= 0; i--) {
      const sum =
        Number(this.value[i] ?? 0) + Number(bigNumber.value[i] ?? 0) + carry;
      carry = Math.floor(sum / 10);
      resultDigits[i + 1] = sum % 10;
    }

    if (carry > 0) resultDigits[0] = carry;

    const newValue = resultDigits.join("");
    if (!this.isValid(newValue)) {
      throw new Error(
        `Error while adding ${this.toString()} + ${bigNumber.toString()}`,
      );
    }
    return new BigNumberString(newValue);
  }
  multiply(bigNumber: BigNumberString): BigNumberString {
    return new BigNumberString("10");
  }

  toString(): string {
    return this.value;
  }

  protected isValid(value: string): value is `${number}` {
    return !Number.isNaN(value);
  }
}

import { BigNumberBase } from "./big-number-base";

export class BigNumberBigint extends BigNumberBase<bigint> {
  add(bigNumber: BigNumberBigint): BigNumberBigint {
    return new BigNumberBigint(this.value + bigNumber.value);
  }
  multiply(bigNumber: BigNumberBigint): BigNumberBigint {
    return new BigNumberBigint(this.value * bigNumber.value);
  }

  toString(): string {
    return String(this.value);
  }
}

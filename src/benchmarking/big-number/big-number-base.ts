export abstract class BigNumberBase<T> {
  protected readonly scientificPrecision = 2;

  constructor(protected readonly value: T) {
    if (!this.isValid(value)) throw new Error(`${value} is invalid`);
  }

  protected isValid(value: T): boolean {
    return true;
  }

  abstract add(bigNumber: BigNumberBase<T>): BigNumberBase<T>;
  abstract multiply(bigNumber: BigNumberBase<T>): BigNumberBase<T>;

  abstract toString(): string;
  toScientificNotation(): `${string}E${number}` {
    const base = this.getBase();
    const exponent = this.getDigitCount() - 1;
    return `${base}E${exponent}`;
  }

  // Need to return string and not number to avoid precision loss
  private getBase(): string {
    const stringValue = this.toString();

    const firstDigit = `${stringValue[0]}`;
    const precisionDigits = `${stringValue.slice(1, this.scientificPrecision + 1)}`;
    const scientificBase = `${firstDigit}.${precisionDigits}`;

    return scientificBase.padEnd(this.scientificPrecision + 2, "0");
  }

  protected getDigitCount(): number {
    return `${this.value}`.length;
  }
}

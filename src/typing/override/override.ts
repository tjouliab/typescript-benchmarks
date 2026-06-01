type Override<T, U> = U & Omit<T, keyof U>;

type UserEntity = {
  name: string;
  createdAt: Date;
  age: number;
};

type UserDto = {
  firstName: string;
  name: string;
  createdAt: string;
};

type UserOverride = Override<UserEntity, UserDto>;

const userValid: UserOverride = {
  firstName: "",
  name: "",
  createdAt: "",
  age: 0,
};

const userInvalid: UserOverride = {
  firstName: "",
  name: "",
  // @ts-expect-error
  createdAt: new Date(),
  age: 0,
};

import * as Benchmark from "benchmark";

type User = {
  name: string;
  age: number;
};

const DEFAULT_USER: Readonly<Required<User>> = {
  name: "John",
  age: 25,
};

function getDefaultUser(): Readonly<Required<User>> {
  return {
    name: "John",
    age: 25,
  };
}

function createDefautUsersObj() {
  return [DEFAULT_USER, DEFAULT_USER, DEFAULT_USER, DEFAULT_USER, DEFAULT_USER];
}

function createDefautUsersFunction() {
  return [
    getDefaultUser(),
    getDefaultUser(),
    getDefaultUser(),
    getDefaultUser(),
    getDefaultUser(),
  ];
}

function createDefautUsersOneCall() {
  const defaultUser = getDefaultUser();
  return [defaultUser, defaultUser, defaultUser, defaultUser, defaultUser];
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`createDefautUsersObj`, () => {
    createDefautUsersObj();
  })
  .add(`createDefautUsersFunction`, () => {
    createDefautUsersFunction();
  })
  .add(`createDefautUsersOneCall`, () => {
    createDefautUsersOneCall();
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });

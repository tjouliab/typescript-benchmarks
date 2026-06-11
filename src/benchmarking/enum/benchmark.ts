import * as Benchmark from "benchmark";

enum SeasonEnumNum {
  Spring,
  Summer,
  Fall,
  Winter,
}

enum SeasonEnum {
  Spring = "Spring",
  Summer = "Summer",
  Fall = "Fall",
  Winter = "Winter",
}

const SeasonObjNum = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
  Winter: 4,
} as const;

const SeasonObj = {
  Spring: "Spring",
  Summer: "Summer",
  Fall: "Fall",
  Winter: "Winter",
} as const;

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`SeasonEnumNum`, () => {
    SeasonEnumNum.Summer === 1;
  })
  .add(`SeasonEnum`, () => {
    SeasonEnum.Summer === "Summer";
  })
  .add(`SeasonObjNum`, () => {
    SeasonObjNum.Summer === 2;
  })
  .add(`SeasonObj`, () => {
    SeasonObj.Summer === "Summer";
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });

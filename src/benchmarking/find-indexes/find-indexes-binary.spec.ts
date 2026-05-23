import { findIndexesBinary } from "./find-indexes-binary";
import { Timeline } from "./timeline.model";

describe("findIndexBinary", () => {
  it("should return empty", () => {
    const timeline1: Timeline[] = [];
    const timeline2: Timeline[] = [];

    const expected: Map<string, number> = new Map();

    const result = findIndexesBinary(timeline1, timeline2);

    expect([...result.entries()]).toEqual([...expected.entries()]);
  });

  it("should return one element", () => {
    const timeline1: Timeline[] = [
      {
        from: "2025-01-01 00:00:00",
        to: "2025-01-01 00:05:00",
      },
    ];
    const timeline2: Timeline[] = JSON.parse(JSON.stringify(timeline1));

    const expected: Map<string, number> = new Map([["2025-01-01 00:00:00", 0]]);

    const result = findIndexesBinary(timeline1, timeline2);

    expect([...result.entries()]).toEqual([...expected.entries()]);
  });

  it("should return multiple elements if all are matching", () => {
    const timeline1: Timeline[] = [
      {
        from: "2025-01-01 00:00:00",
        to: "2025-01-01 00:05:00",
      },
      {
        from: "2025-01-01 00:05:00",
        to: "2025-01-01 00:10:00",
      },
      {
        from: "2025-01-01 00:10:00",
        to: "2025-01-01 00:15:00",
      },
      {
        from: "2025-01-01 00:15:00",
        to: "2025-01-01 00:20:00",
      },
    ];
    const timeline2: Timeline[] = JSON.parse(JSON.stringify(timeline1));

    const expected: Map<string, number> = new Map([
      ["2025-01-01 00:00:00", 0],
      ["2025-01-01 00:05:00", 1],
      ["2025-01-01 00:10:00", 2],
      ["2025-01-01 00:15:00", 3],
    ]);

    const result = findIndexesBinary(timeline1, timeline2);

    expect([...result.entries()]).toEqual([...expected.entries()]);
  });

  it("should return multiple elements if some are matching", () => {
    const timeline1: Timeline[] = [
      {
        from: "2025-01-01 00:00:00",
        to: "2025-01-01 00:05:00",
      },
      {
        from: "2025-01-01 00:05:00",
        to: "2025-01-01 00:10:00",
      },
      {
        from: "2025-01-01 00:10:00",
        to: "2025-01-01 00:15:00",
      },
      {
        from: "2025-01-01 00:15:00",
        to: "2025-01-01 00:20:00",
      },
    ];
    const timeline2: Timeline[] = [
      {
        from: "2025-01-01 00:00:00",
        to: "2025-01-01 00:05:00",
      },
      {
        from: "2025-01-01 00:15:00",
        to: "2025-01-01 00:20:00",
      },
    ];

    const expected: Map<string, number> = new Map([
      ["2025-01-01 00:00:00", 0],
      ["2025-01-01 00:15:00", 3],
    ]);

    const result = findIndexesBinary(timeline1, timeline2);

    expect([...result.entries()]).toEqual([...expected.entries()]);
  });
});

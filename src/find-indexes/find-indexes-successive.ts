import { Timeline } from "./timeline.model";

export function findIndexesSuccessive(
  timeline1: Timeline[],
  timeline2: Timeline[]
): Map<string, number> {
  const indexes = new Map<string, number>();
  let offset = 0;

  for (const item2 of timeline2) {
    for (let index = offset; index < timeline1.length; index++) {
      const item1 = timeline1[index];
      if (item1.from !== item2.from) continue;

      indexes.set(item1.from, index);
      offset = index;
      break;
    }
  }
  return indexes;
}

import { Timeline } from "./timeline.model";

export function findIndexesBinary(
  timeline1: Timeline[],
  timeline2: Timeline[]
): Map<string, number> {
  const indexes = new Map<string, number>();
  let offset = 0;

  for (const item2 of timeline2) {
    const index = findIndexBinary(
      timeline1,
      item2,
      offset,
      timeline1.length - 1
    );
    indexes.set(item2.from, index);
    offset = index; // Next search starts from here
  }
  return indexes;
}

function findIndexBinary(
  timeline1: Timeline[],
  item2: Timeline,
  left: number,
  right: number
): number {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midFrom = timeline1[mid].from;

    if (midFrom === item2.from) {
      return mid;
    } else if (midFrom < item2.from) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

import { parseInput } from "../helper.js";

export function part1(input) {
  let [ranges, ids] = input
    .trim()
    .split("\n\n")
    .map((block) => block.split("\n"));
  ranges = ranges.map((range) => range.split("-").map(Number));
  ids = ids.map(Number);
  let freshCount = 0;
  ids.forEach((id) => {
    if (ranges.some((range) => id >= range[0] && id <= range[1])) freshCount++;
  });
  return freshCount;
}

export function part2(input) {
  const ranges = parseInput(input.split("\n\n")[0], {
    map: (range) => range.split("-").map(Number),
  });
  ranges.sort((a, b) => a[0] - b[0]);
  let max = -1;
  let freshIdCount = 0;
  for (const [start, end] of ranges) {
    if (start > max) {
      freshIdCount += end - start + 1;
      max = end;
    } else if (end > max) {
      freshIdCount += end - max;
      max = end;
    }
  }
  return freshIdCount;
}

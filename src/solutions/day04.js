import { parseInput } from "../helper.js";

function parserMap(row) {
  return row.split("").map((pos) => (pos === "@" ? 1 : 0));
}

const directions = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

export function part1(input) {
  const rollsMap = parseInput(input, { map: parserMap });
  const rowCount = rollsMap.length;
  const colCount = rollsMap[0].length;
  let accessibleRollCount = 0;
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      if (rollsMap[i][j] === 0) continue;
      const neighbourCount = directions.filter(([di, dj]) => {
        const ni = i + di;
        const nj = j + dj;
        return (
          ni >= 0 &&
          ni < rowCount &&
          nj >= 0 &&
          nj < colCount &&
          rollsMap[ni][nj] === 1
        );
      }).length;
      if (neighbourCount < 4) accessibleRollCount += 1;
    }
  }
  return accessibleRollCount;
}

export function part2(input) {
  const rollsMap = parseInput(input, { map: parserMap });
  const rowCount = rollsMap.length;
  const colCount = rollsMap[0].length;
  let accessibleRollCount = 0;
  let toRemove = [];
  do {
    toRemove = [];
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        if (rollsMap[i][j] === 0) continue;
        let neighbourCount = 0;
        directions.forEach(([di, dj]) => {
          const ni = i + di;
          const nj = j + dj;
          if (
            ni >= 0 &&
            ni < rowCount &&
            nj >= 0 &&
            nj < colCount &&
            rollsMap[ni][nj] === 1
          ) {
            neighbourCount++;
          }
        });
        if (neighbourCount < 4) {
          toRemove.push([i, j]);
          accessibleRollCount++;
        }
      }
    }
    toRemove.forEach(([i, j]) => {
      rollsMap[i][j] = 0;
    });
  } while (toRemove.length !== 0);
  return accessibleRollCount;
}

import { parseInput } from "../helper.js";

function parserMap(range) {
  return range.split("-").map((num) => Number(num));
}

export function part1(input) {
  const idRanges = parseInput(input, { delim: ",", map: parserMap });
  let invalidIdSum = 0;
  idRanges.forEach(([start, end]) => {
    for (let id = start; id <= end; id++) {
      const idStr = String(id);
      length = idStr.length;
      if (length % 2 !== 0) continue;
      const left = idStr.slice(0, length / 2);
      const right = idStr.slice(length / 2, length);
      if (left === right) invalidIdSum += id;
    }
  });
  return invalidIdSum;
}

export function part2(input) {
  const idRanges = parseInput(input, { delim: ",", map: parserMap });
  let invalidIdSum = 0;
  idRanges.forEach(([start, end]) => {
    for (let id = start; id <= end; id++) {
      const idStr = String(id);
      const idStrDoubled = idStr + idStr;
      const idStrSliced = idStrDoubled.slice(1, -1);
      if (idStrSliced.includes(idStr)) invalidIdSum += id;
    }
  });
  return invalidIdSum;
}

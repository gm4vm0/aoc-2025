import { parseInput } from "../helper.js";

function parserMap(line) {
  const direction = line[0];
  const rotation = Number(line.slice(1));
  return direction === "R" ? rotation : -rotation;
}

export function part1(input) {
  input = parseInput(input, { map: parserMap });
  let dial = 50;
  let password = 0;
  for (const turn of input) {
    dial = (dial + turn + 100) % 100;
    if (dial === 0) password += 1;
  }
  return password;
}

export function part2(input) {
  input = parseInput(input, { map: parserMap });
  let dial = 50;
  let password = 0;
  for (let turn of input) {
    password += Math.abs(Math.trunc(turn / 100));
    turn = turn % 100;
    const prevDial = dial;
    dial += turn;
    if ((prevDial !== 0 && dial < 0) || dial > 99 || dial == 0) password += 1;
    dial = (dial + 100) % 100;
  }
  return password;
}

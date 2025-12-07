import { parseInput } from "../helper.js";

export function part1(input) {
  let totalOutput = 0;
  const banks = parseInput(input);
  banks.forEach((bank) => {
    const batteries = bank.split("").map((joltage) => Number(joltage));
    let left = 0;
    let right = batteries.length - 1;
    for (let i = 1; i < batteries.length - 1; i++) {
      if (batteries[i] > batteries[left]) left = i;
    }
    for (let i = batteries.length - 1; i > left; i--) {
      if (batteries[i] > batteries[right]) right = i;
    }
    totalOutput += batteries[left] * 10 + batteries[right];
  });
  return totalOutput;
}

export function part2(input) {
  let totalOutput = 0;
  const banks = parseInput(input);
  banks.forEach((bank) => {
    const batteries = bank.split("").map((joltage) => Number(joltage));
    const size = batteries.length;
    const onBatteries = [0];
    for (let i = 1; i < size - 11; i++) {
      if (batteries[i] > batteries[onBatteries[0]]) onBatteries[0] = i;
    }
    for (let i = 1; i < 12; i++) {
      const start = onBatteries[i - 1] + 1;
      onBatteries.push(start);
      for (let j = start; j < size - 11 + i; j++) {
        if (batteries[j] > batteries[onBatteries[i]]) onBatteries[i] = j;
      }
    }
    const output = Number(onBatteries.map((i) => batteries[i]).join(""));
    totalOutput += output;
  });
  return totalOutput;
}

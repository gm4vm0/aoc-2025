import { parseInput } from "../helper.js";

export function part1(input) {
  const lines = parseInput(input);
  const operations = parseInput(lines.at(-1), { delim: /\s+/ });
  const operands = lines
    .slice(0, -1)
    .map((line) => parseInput(line, { delim: /\s+/, asNumbers: true }));
  let grandTotal = 0;
  for (let i = 0; i < operands[0].length; i++) {
    if (operations[i] === "+") {
      grandTotal += operands.reduce((sum, line) => sum + line[i], 0);
    } else {
      grandTotal += operands.reduce((product, line) => product * line[i], 1);
    }
  }
  return grandTotal;
}

export function part2(input) {
  const lines = input.split("\n").slice(0, -1);
  let grandTotal = 0;
  let operands = [];
  for (let i = lines[0].length - 1; i >= 0; i--) {
    const tokens = lines.map((line) => line[i]);
    let operand = 0;
    const digits = tokens
      .slice(0, -1)
      .filter((token) => token !== " ")
      .map(Number);
    for (let j = 0; j < digits.length; j++) {
      operand += digits.at(-1 - j) * 10 ** j;
    }
    operands.push(operand);
    if (tokens.at(-1) === "+") {
      grandTotal += operands.reduce((sum, operand) => sum + operand, 0);
    } else if (tokens.at(-1) === "*") {
      grandTotal += operands.reduce((product, operand) => product * operand, 1);
    } else {
      continue;
    }
    operands = [];
    i--;
  }
  return grandTotal;
}

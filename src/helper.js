export function parseInput(input, options = {}) {
  const { asNumbers = false, skipEmpty = true, map } = options;

  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !skipEmpty || line !== "")
    .map((line) => {
      if (map) return map(line);
      if (asNumbers) return Number(line);
      return line;
    });
}

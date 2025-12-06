export function parseInput(input, options = {}) {
  const { delim = "\n", asNumbers = false, skipEmpty = true, map } = options;

  return input
    .split(delim)
    .map((token) => token.trim())
    .filter((token) => !skipEmpty || token !== "")
    .map((token) => {
      if (map) return map(token);
      if (asNumbers) return Number(token);
      return token;
    });
}

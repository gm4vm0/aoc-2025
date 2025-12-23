import { parseInput } from "../helper.js";

export function part1(input) {
  const diagram = parseInput(input, { map: (row) => row.split("") });
  let beamLocations = [diagram[0].indexOf("S")];
  let splitCount = 0;
  for (let row = 2; row < diagram.length; row += 2) {
    const newBeamLocations = [];
    for (const beamLocation of beamLocations) {
      if (diagram[row][beamLocation] === ".")
        newBeamLocations.push(beamLocation);
      else {
        newBeamLocations.push(beamLocation - 1);
        newBeamLocations.push(beamLocation + 1);
        splitCount++;
      }
    }
    newBeamLocations.sort();
    beamLocations = [];
    for (let i = 0; i < newBeamLocations.length; i++) {
      if (i === 0 || newBeamLocations[i] !== newBeamLocations[i - 1]) {
        beamLocations.push(newBeamLocations[i]);
      }
    }
  }
  return splitCount;
}

export function part2(input) {
  const diagram = parseInput(input, { map: (row) => row.split("") });
  let beams = new Array(diagram[0].length).fill(0);
  beams[diagram[0].indexOf("S")] = 1;
  for (let row = 2; row < diagram.length; row += 2) {
    const newBeams = new Array(diagram[0].length).fill(0);
    for (let col = 0; col < diagram[0].length; col++) {
      if (beams[col] === 0) continue;
      if (diagram[row][col] === ".") newBeams[col] += beams[col];
      else {
        if (col > 0) newBeams[col - 1] += beams[col];
        if (col < diagram[0].length - 1) newBeams[col + 1] += beams[col];
      }
    }
    beams = newBeams;
  }
  return beams.reduce((a, b) => a + b, 0);
}

import { parseInput } from "../helper.js";

function calcDistanceSqrd(coordA, coordB) {
  return (
    (coordA[0] - coordB[0]) ** 2 +
    (coordA[1] - coordB[1]) ** 2 +
    (coordA[2] - coordB[2]) ** 2
  );
}

class DisjointSet {
  constructor(n) {
    this.parents = Array.from({ length: n }, (_, i) => i);
    this.sizes = new Array(n).fill(1);
  }

  find(i) {
    if (this.parents[i] === i) return i;
    this.parents[i] = this.find(this.parents[i]);
    return this.parents[i];
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI === rootJ) return;
    if (this.sizes[rootI] < this.sizes[rootJ]) {
      this.parents[rootI] = rootJ;
      this.sizes[rootJ] += this.sizes[rootI];
    } else {
      this.parents[rootJ] = rootI;
      this.sizes[rootI] += this.sizes[rootJ];
    }
  }
}

export function part1(input) {
  const junctionBoxes = parseInput(input, {
    map: (coord) => coord.split(",").map(Number),
  });
  let distances = [];
  for (let i = 0; i < junctionBoxes.length - 1; i++) {
    for (let j = i + 1; j < junctionBoxes.length; j++) {
      const dist = calcDistanceSqrd(junctionBoxes[i], junctionBoxes[j]);
      distances.push([dist, i, j]);
    }
  }
  distances.sort((distA, distB) => distA[0] - distB[0]);
  distances = distances.slice(0, 1000);
  let circuits = new DisjointSet(junctionBoxes.length);
  for (let k = 0; k < distances.length; k++) {
    const [, i, j] = distances[k];
    circuits.union(i, j);
  }
  const sortedCircuits = circuits.sizes.sort((a, b) => b - a);
  return sortedCircuits[0] * sortedCircuits[1] * sortedCircuits[2];
}

export function part2(input) {
  const junctionBoxes = parseInput(input, {
    map: (coord) => coord.split(",").map(Number),
  });
  let distances = [];
  for (let i = 0; i < junctionBoxes.length - 1; i++) {
    for (let j = i + 1; j < junctionBoxes.length; j++) {
      const dist = calcDistanceSqrd(junctionBoxes[i], junctionBoxes[j]);
      distances.push([dist, i, j]);
    }
  }
  distances.sort((distA, distB) => distA[0] - distB[0]);
  let circuits = new DisjointSet(junctionBoxes.length);
  let xProduct;
  for (let k = 0; k < distances.length; k++) {
    if (circuits.sizes[circuits.find(0)] === junctionBoxes.length) break;
    const [, i, j] = distances[k];
    circuits.union(i, j);
    xProduct = junctionBoxes[i][0] * junctionBoxes[j][0];
  }
  return xProduct;
}

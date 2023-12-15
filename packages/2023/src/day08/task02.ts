const input = await Bun.file("./packages/2023/src/day08/input.txt").text();
const inputs = input.split("\n\n");

const directions = inputs[0].split("");

const lines = inputs[1].split("\n");

const map = new Map<string, [string, string]>();
for (const line of lines) {
  const sides = line.split(" = ");
  const key = sides[0];
  const [left, right] = sides[1].substring(1, sides[1].length - 1).split(", ");
  map.set(key, [left, right]);
}

const locations = [...map.keys()].filter((key) => key.endsWith("A"));
const steps = [];

for (const start of locations) {
  let location = start;
  let numSteps = 0;
  let dirIndex = 0;
  while (!location.endsWith("Z")) {
    const [left, right] = map.get(location)!;
    const direction = directions[dirIndex];
    if (direction === "L") {
      location = left;
    } else {
      location = right;
    }

    numSteps++;
    dirIndex++;
    if (dirIndex === directions.length) {
      dirIndex = 0;
    }
  }
  steps.push(numSteps)
}

console.log(steps.join(" "));

// If each path repeats, then the lowest common multiple is the step divisible
// by the length of each path, which mean that on that step, we will be at the
// end of each path, meaning that all the simultaneous locations will end with
// a Z.
//
// Lowest common multiple is 18215611419223

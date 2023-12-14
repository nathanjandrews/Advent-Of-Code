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

let numSteps = 0;
let location = "AAA";
let dirIndex = 0;
while (location !== "ZZZ") {
  const [left, right] = map.get(location)!;
  const direction = directions[dirIndex];

  numSteps++;
  if (direction === "L") {
    location = left;
  } else {
    location = right;
  }

  dirIndex++
  if (dirIndex === directions.length) {
    dirIndex = 0;
  }
}

console.log(numSteps);

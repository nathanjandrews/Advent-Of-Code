const input = await Bun.file("./packages/2023/src/day12/input.txt").text();
const lines = input.split("\n");

let sum = 0;
for (const line of lines) {
  sum += getNumArrangements(line);
}
console.log("sum of counts:", sum);

function getNumArrangements(line: string) {
  const split = line.split(" ");
  const conditions = split[0].split("");
  const groups = split[1].split(",").map((c) => parseInt(c));

  return backtrack(conditions, groups);
}

function backtrack(conditions: string[], groups: number[]): number {
  const questionIndex = conditions.indexOf("?");
  if (questionIndex === -1) {
    // At this point there is no question mark in the string, so now we need
    // to check if this arrangement is valid
    return isValid(conditions, groups) ? 1 : 0;
  }

  // at this point there is a question mark so we need to check both the # and .
  // cases for the question mark.
  return (
    backtrack(conditions.with(questionIndex, "#"), groups) +
    backtrack(conditions.with(questionIndex, "."), groups)
  );
}

function isValid(conditions: string[], groups: number[]) {
  const actualGroups = conditions
    .join("")
    .split(/\.+/g)
    .filter((s) => s !== "");
  if (actualGroups.length !== groups.length) {
    return false;
  }

  return groups.every((g, i) => g === actualGroups[i].length);
}

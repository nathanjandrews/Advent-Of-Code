const input = await Bun.file("./packages/2023/src/day12/input.txt").text();

const lines = expandLines(input.split("\n"));
const EXPANSION_FACTOR = 5;
const cache = new Map<string, number>();

let sum = 0;
for (const line of lines) {
  sum += backtrack(line.conditions, line.groups);
}
console.log("sum of counts:", sum);

function expandLines(lines: string[]) {
  const output = [];

  for (const line of lines) {
    const split = line.split(" ");
    const conditions = split[0].split("");
    const groups = split[1].split(",").map((c) => parseInt(c));

    const expandedConditions = [];
    const expandedGroups = [];

    for (let i = 0; i < EXPANSION_FACTOR; i++) {
      expandedConditions.push(...conditions);
      if (i !== EXPANSION_FACTOR - 1) {
        expandedConditions.push("?");
      }

      expandedGroups.push(...groups);
    }

    output.push({
      conditions: expandedConditions,
      groups: expandedGroups,
    });
  }

  return output;
}

function backtrack(conditions: string[], groups: number[]): number {
  const cacheKey = toCacheKey(conditions, groups);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  // if there are no more conditions, then there must not be any more groups
  if (conditions.length === 0) {
    return groups.length === 0 ? 1 : 0;
  }

  // if there are no more groups, then there must not be any more # in the
  // remaining conditions
  if (groups.length === 0) {
    return conditions.some((c) => c === "#") ? 0 : 1;
  }

  let sum = 0;
  if (conditions[0] === "." || conditions[0] === "?") {
    sum += backtrack(conditions.slice(1), groups);
  }

  if (conditions[0] === "#" || conditions[0] === "?") {
    if (
      groups[0] <= conditions.length &&
      !conditions.slice(0, groups[0]).includes(".") &&
      (groups[0] === conditions.length || conditions[groups[0]] !== "#")
    ) {
      sum += backtrack(conditions.slice(groups[0] + 1), groups.slice(1));
    }
  }

  cache.set(toCacheKey(conditions, groups), sum);
  return sum;
}

function toCacheKey(conditions: string[], groups: number[]) {
  return conditions.join("") + groups.join(",");
}

const input = await Bun.file("./packages/2023/src/day09/input.txt").text();
const lines = input.split("\n");

function extrapolate(line: string) {
  const history = line.split(" ").map((c) => parseInt(c));
  let differences = [history];
  let currentDifferences = [...history];
  while (!currentDifferences.every((d) => d === 0)) {
    let arr = [];
    for (let i = 0; i < currentDifferences.length - 1; i++) {
      arr.push(currentDifferences[i + 1] - currentDifferences[i]);
    }
    currentDifferences = arr;
    differences.push(currentDifferences);
  }

  
  differences.reverse();
  differences[0].unshift(0);

  for (let i = 1; i < differences.length; i++) {
    const target = differences[i - 1][0];
    const n = differences[i][0];
    const e = n - target;
    differences[i].unshift(e);
  }

  const extrapolatedValue = differences[differences.length - 1][0];
  return extrapolatedValue;
}

let sum = 0;
for (const line of lines) {
  sum += extrapolate(line);
}

console.log(sum);

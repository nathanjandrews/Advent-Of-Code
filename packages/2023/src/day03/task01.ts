const input = await Bun.file("./packages/2023/src/day03/input01.txt").text();
const lines = input.split("\n");

let sum = 0;

for (let row = 0; row < lines.length; row++) {
  const line = lines[row];
  const numberMatches = line.matchAll(/\d+/g);
  for (const match of numberMatches) {
    const numIndex = match.index!;
    const numString = match[0];

    outer: for (let i = row - 1; i < row + 2; i++) {
      for (let j = numIndex - 1; j < numIndex + numString.length + 1; j++) {
        if (i == row && j >= numIndex && j < numIndex + numString.length) {
          // skip the actual digit characters
          continue;
        }

        const char = lines[i] && lines[i][j];
        if (char && char != ".") {
          sum += parseInt(numString);
          break outer;
        }
      }
    }

    // console.log(`${match.index}: ${match[0]}`)
  }
}

console.log(sum);

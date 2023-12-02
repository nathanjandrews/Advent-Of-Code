const input = await Bun.file("./packages/2023/src/day01/input01.txt").text();
const lines = input.split("\n");

let sum = 0;

for (const line of lines) {
  // these two values WILL be overwritten
  let leftDigit = 0;
  let rightDigit = 0;

  for (let i = 0; i < line.length; i++) {
    let digit = parseInt(line[i]);
    if (!isNaN(digit)) {
      leftDigit = digit;
      break;
    }
  }

  for (let i = line.length - 1; i >= 0; i--) {
    let digit = parseInt(line[i]);
    if (!isNaN(digit)) {
      rightDigit = digit;
      break;
    }
  }

  sum += leftDigit * 10 + rightDigit;
}

console.log(sum);

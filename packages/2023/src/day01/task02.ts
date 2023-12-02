const nameToValue = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

const input = await Bun.file("./packages/2023/src/day01/input01.txt").text();
const lines = input.split("\n");

let sum = 0;

for (const line of lines) {
  // this value WILL be overwritten
  let leftDigit = 0;

  for (let i = 0; i < line.length; i++) {
    let hasLetterDigit = false;
    for (const [key, value] of nameToValue.entries()) {
      if (line.substring(i).startsWith(key)) {
        leftDigit = value;
        hasLetterDigit = true;
        break;
      }
    }
    if (hasLetterDigit) break;

    let digit = parseInt(line[i]);
    if (!isNaN(digit)) {
      leftDigit = digit;
      break;
    }
  }

  // this value WILL be overwritten
  let rightDigit = 0;
  for (let i = line.length - 1; i >= 0; i--) {
    let hasLetterDigit = false;
    for (const [key, value] of nameToValue.entries()) {
      if (line.substring(i).startsWith(key)) {
        rightDigit = value;
        hasLetterDigit = true;
        break;
      }
    }
    if (hasLetterDigit) break;

    let digit = parseInt(line[i]);
    if (!isNaN(digit)) {
      rightDigit = digit;
      break;
    }
  }

  sum += leftDigit * 10 + rightDigit;
}

console.log(sum);

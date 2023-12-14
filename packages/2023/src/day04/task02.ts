const input = await Bun.file("./packages/2023/src/day04/input01.txt").text();
const lines = input.split("\n");

const cache = lines.map(getAmountOfWinningNumbers);
const queue = lines.map((_, index) => index);

let total = queue.length;

while (queue.length !== 0) {
  const index = queue.shift()!;

  const n = cache[index];

  for (let i = index + 1; i < index + 1 + n; i++) {
    queue.push(i);
    total++;
  }
}

console.log(total);

// function to count the number of winning cards in a hand
function getAmountOfWinningNumbers(line: string) {
  const numbersString = line.substring(line.indexOf(":") + 1);
  const [winningNumbers, myNumbers] = numbersString.split("|").map((s) =>
    s
      .trim()
      .split(/\s+/)
      .map((s) => parseInt(s))
  );

  let numWinningNumbers = 0;
  for (const n of myNumbers) {
    if (winningNumbers.some((winningNumber) => winningNumber === n)) {
      numWinningNumbers++;
    }
  }

  return numWinningNumbers;
}

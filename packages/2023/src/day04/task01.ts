const input = await Bun.file("./packages/2023/src/day04/input01.txt").text();
const lines = input.split("\n");

let sum = 0;

for (const line of lines) {
  const numbersString = line.substring(line.indexOf(":") + 1);
  const [winningNumbers, myNumbers] = numbersString.split("|").map((s) =>
    s
      .trim()
      .split(/\s+/)
      .map((s) => parseInt(s))
  );

  let cardValue = 0;
  let hasMatch = false;
  for (const n of myNumbers) {
    if (winningNumbers.some((winningNumber) => winningNumber === n)) {
      if (!hasMatch) {
        cardValue += 1;
        hasMatch = true;
      } else {
        cardValue *= 2;
      }
    }
  }
  sum += cardValue;
}

console.log(sum);

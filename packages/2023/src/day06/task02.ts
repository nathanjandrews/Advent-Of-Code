const input = await Bun.file("./packages/2023/src/day06/input.txt").text();
const lines = input.split("\n");

const time = parseInt(
  lines[0]
    .substring(lines[0].indexOf(":") + 1)
    .trim()
    .split(/\s+/)
    .join("")
);

const distance = parseInt(
  lines[1]
    .substring(lines[1].indexOf(":") + 1)
    .trim()
    .split(/\s+/)
    .join("")
);

console.log(getNumWaysToWin(time, distance));

function getNumWaysToWin(recordTime: number, distance: number) {
  let total = 0;
  let timeRemaining = recordTime;
  let speed = 0;
  while (timeRemaining >= 0) {
    if (speed * timeRemaining > distance && timeRemaining < recordTime) {
      total++;
    }
    timeRemaining--;
    speed++;
  }
  return total;
}

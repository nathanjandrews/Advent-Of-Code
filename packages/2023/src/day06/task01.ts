const input = await Bun.file("./packages/2023/src/day06/input.txt").text();
const lines = input.split("\n");

const times = lines[0]
  .substring(lines[0].indexOf(":") + 1)
  .trim()
  .split(/\s+/)
  .map((s) => parseInt(s));

const distances = lines[1]
  .substring(lines[1].indexOf(":") + 1)
  .trim()
  .split(/\s+/)
  .map((s) => parseInt(s));

let product = 1;

for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distance = distances[i];
  const n =  getNumWaysToWin(time, distance);
  console.log(n)
  product *= n
}

console.log(product);

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

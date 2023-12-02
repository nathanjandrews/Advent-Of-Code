const input = await Bun.file("./packages/2023/src/day02/input01.txt").text();
const lines = input.split("\n");

// const lines = [
//   "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
//   "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
//   "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
//   "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
//   "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
// ];

let sum = 0;

for (const line of lines) {
  const n = parseInt(line.substring(line.indexOf(" "), line.indexOf(":")));

  const resultStrings = line.substring(line.indexOf(":") + 2).split("; ");

  let blue = 0;
  let green = 0;
  let red = 0;
  for (const resultStr of resultStrings) {
    const pulls = resultStr.split(", ");
    for (const pull of pulls) {
      const number = parseInt(pull.substring(0, pull.indexOf(" ")));
      if (pull.includes("blue")) blue = Math.max(blue, number);
      else if (pull.includes("green")) green = Math.max(green, number);
      else if (pull.includes("red")) red = Math.max(red, number);
    }
  }

  sum += blue * red * green;
}

console.log(sum);

const input = await Bun.file("./packages/2023/src/day11/input.txt").text();
const expansionFactor = 1000000;

// expand the grid to account for double rows and columns
const grid = input.split("\n").map((row) => row.split(""));
const expandedRows = getExpandedRows(grid);
const expandedColumns = getExpandedRows(transpose(grid));

const points = [];
// assign each point a number
let pointNumber = 1;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] === "#") {
      let numExpandedRows = expandedRows.filter((index) => index < row).length;
      let numExpandedCol = expandedColumns.filter((index) => index < col).length;

      points.push({
        id: pointNumber,
        x: col + numExpandedCol * (expansionFactor - 1),
        y: row + numExpandedRows * (expansionFactor - 1),
      });
      pointNumber++;
    }
  }
}

let sum = 0;
let numPairs = 0;
for (let p1Index = 0; p1Index < points.length; p1Index++) {
  const p1 = points[p1Index];
  for (let p2Index = p1Index + 1; p2Index < points.length; p2Index++) {
    const p2 = points[p2Index];
    const manhattanDistance = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    sum += manhattanDistance;
    numPairs++;
  }
}

console.log("sum of the shortest paths:", sum);

function getExpandedRows(grid: string[][]) {
  const expanded = [];
  for (let i = 0; i < grid.length; i++) {
    if (!grid[i].some((elem) => elem === "#")) {
      expanded.push(i);
    }
  }
  return expanded;
}

// found this online
function transpose(arr: string[][]) {
  return arr[0].map((col, i) => arr.map((row) => row[i]));
}

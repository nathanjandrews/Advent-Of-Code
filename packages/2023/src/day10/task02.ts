const input = await Bun.file("./packages/2023/src/day10/input.txt").text();
const grid = input.split("\n");
const width = grid[0].length;

class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  hash() {
    return this.y * width + this.x;
  }
}

type PipeType = "|" | "-" | "L" | "J" | "7" | "F";

type Pipe = {
  location: Point;
  type: PipeType;
  distance: number;
};

let startPos: Point;
outer: for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === "S") {
      startPos = new Point(col, row);
      break outer;
    }
  }
}

const startPipe: Pipe = {
  type: "7", // I looked at the input to determine this
  location: startPos!,
  distance: 0,
};

const visited = new Set([startPipe.location.hash()]);
const pathPoints = new Set([startPipe.location.hash()]);
const queue: Pipe[] = [startPipe];

while (queue.length > 0) {
  const pipe = queue.shift()!;
  const adjacentPipes = getConnectedAdjacentPipes(pipe, pipe.distance + 1);

  for (const adj of adjacentPipes) {
    if (!visited.has(adj.location.hash())) {
      pathPoints.add(adj.location.hash());
      visited.add(adj.location.hash());
      queue.push(adj);
    }
  }
}

// "cast a ray" through the grid
let loopArea = 0;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (pathPoints.has(row * width + col)) {
      continue;
    }

    // (col, row) is the start point of the ray. We can then "cast" the ray out
    // from (col, row) to the end of the row, and count the number of crossings
    let insideLoop = false;
    for (let i = col; i < grid[0].length; i++) {
      if (pathPoints.has(row * width + i)) {
        const prevItem = grid[row][i - 1];
        while (i < grid[row].length - 1 && grid[row][i] === "-") {
          i++;
        }
        const currentItem = grid[row][i];

        if (
          currentItem === "|" ||
          (prevItem && prevItem === "F" && currentItem === "J") ||
          (prevItem && prevItem === "L" && currentItem === "7")
        ) {
          insideLoop = !insideLoop;
        }
      }
    }

    if (insideLoop) {
      loopArea++;
    }
  }
}

console.log("loop area:", loopArea);

// --------------------------------
// helper functions past this point
// --------------------------------
function twoAdjacentVerticalPipes(current: string, next: string) {
  switch (true) {
    case current === "|" && next === "F":
    case current === "|" && next === "L":
    case current === "|" && next === "|":
    case current === "L" && next === "J":
    case current === "L" && next === "7": // maybe not
    case current === "J" && next === "|":
    case current === "J" && next === "F":
    case current === "J" && next === "L":
    case current === "7" && next === "F":
    case current === "7" && next === "L":
    case current === "F" && next === "7":
    case current === "F" && next === "J": // maybe not
      return true;
  }

  return false;
}

function getConnectedAdjacentPipes(pipe: Pipe, distance: number) {
  const { top, bottom, left, right } = getSurroundingPipes(pipe.location, distance);
  const adjacentPipes: Pipe[] = [];

  const getTop = () => {
    if (top && ["|", "7", "F"].includes(top.type)) {
      adjacentPipes.push(top as Pipe);
    }
  };

  const getBottom = () => {
    if (bottom && ["|", "J", "L"].includes(bottom.type)) {
      adjacentPipes.push(bottom as Pipe);
    }
  };

  const getLeft = () => {
    if (left && ["-", "L", "F"].includes(left.type)) {
      adjacentPipes.push(left as Pipe);
    }
  };

  const getRight = () => {
    if (right && ["-", "J", "7"].includes(right.type)) {
      adjacentPipes.push(right as Pipe);
    }
  };

  switch (pipe.type) {
    case "|": {
      getTop();
      getBottom();
      break;
    }
    case "-": {
      getLeft();
      getRight();
      break;
    }
    case "L": {
      getTop();
      getRight();
      break;
    }
    case "J": {
      getTop();
      getLeft();
      break;
    }
    case "7": {
      getBottom();
      getLeft();
      break;
    }
    case "F": {
      getBottom();
      getRight();
      break;
    }
  }

  return adjacentPipes;
}

function getSurroundingPipes(p: Point, distance: number) {
  return {
    top:
      p.y - 1 < 0
        ? undefined
        : { type: grid[p.y - 1][p.x], location: new Point(p.x, p.y - 1), distance },
    bottom:
      p.y + 1 >= grid.length
        ? undefined
        : { type: grid[p.y + 1][p.x], location: new Point(p.x, p.y + 1), distance },
    right:
      p.x + 1 >= grid[0].length
        ? undefined
        : { type: grid[p.y][p.x + 1], location: new Point(p.x + 1, p.y), distance },
    left:
      p.y - 1 < 0
        ? undefined
        : { type: grid[p.y][p.x - 1], location: new Point(p.x - 1, p.y), distance },
  };
}

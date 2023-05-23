// trees in a grid
// each digit is a tree
// trees on edge are automatically visible
// must be fully surrouned by lower digits

const text = await Deno.readTextFile("./input.txt");

const rows = text.split("\n");

const forest = rows.map((row) =>
  row.split("").map((tree) => Number.parseInt(tree, 10))
);

let numVisible = 0;

function walk(row: number, col: number) {
  const treeHeight = forest[row][col];

  //go up
  const up = walkUp(row - 1, col, treeHeight);
  if (up) {
    return true;
  }

  // go left
  const left = walkLeft(row, col - 1, treeHeight);
  if (left) {
    return true;
  }

  // go down
  const down = walkDown(row + 1, col, treeHeight);
  if (down) {
    return true;
  }

  // go right
  const right = walkRight(row, col + 1, treeHeight);
  if (right) {
    return true;
  }

  return false;
}

function walkUp(row: number, col: number, treeHeight: number): boolean {
  if (forest[row][col] >= treeHeight) {
    return false;
  }

  if (forest[row - 1] !== undefined) {
    return walkUp(row - 1, col, treeHeight);
  }

  return true;
}

function walkDown(row: number, col: number, treeHeight: number): boolean {
  if (forest[row][col] >= treeHeight) {
    return false;
  }

  if (forest[row + 1] !== undefined) {
    return walkDown(row + 1, col, treeHeight);
  }

  return true;
}

function walkLeft(row: number, col: number, treeHeight: number): boolean {
  if (forest[row][col] >= treeHeight) {
    return false;
  }

  if (forest[row][col - 1] !== undefined) {
    return walkLeft(row, col - 1, treeHeight);
  }

  return true;
}

function walkRight(row: number, col: number, treeHeight: number): boolean {
  if (forest[row][col] >= treeHeight) {
    return false;
  }

  if (forest[row][col + 1] !== undefined) {
    return walkRight(row, col + 1, treeHeight);
  }

  return true;
}

for (let row = 0; row < forest.length; row++) {
  for (let col = 0; col < forest[row].length; col++) {
    // if on outer wall, automatically visible
    if (
      row === 0 ||
      col === 0 ||
      row === forest.length - 1 ||
      col === forest[row].length - 1
    ) {
      numVisible++;
      continue;
    }

    const walkForest = walk(row, col);

    if (walkForest) {
      numVisible++;
    }
  }
}

console.log("numVisible", numVisible);

// trees in a grid
// each digit is a tree
// trees on edge are automatically visible
// must be fully surrouned by lower digits

const text = await Deno.readTextFile("./input.txt");

const rows = text.split("\n");

const forest = rows.map((row) =>
  row.split("").map((tree) => Number.parseInt(tree, 10))
);

let maxScenicScore = 0;

function walk(row: number, col: number) {
  const treeHeight = forest[row][col];

  //go up
  const up = walkUp(row - 1, col, treeHeight);

  // go left
  const left = walkLeft(row, col - 1, treeHeight);

  // go down
  const down = walkDown(row + 1, col, treeHeight);

  // go right
  const right = walkRight(row, col + 1, treeHeight);

  return up * left * down * right;
}

function walkUp(row: number, col: number, treeHeight: number): number {
  if (forest[row][col] >= treeHeight) {
    return 1;
  }

  if (forest[row - 1] !== undefined) {
    return walkUp(row - 1, col, treeHeight) + 1;
  }

  return 1;
}

function walkDown(row: number, col: number, treeHeight: number): number {
  if (forest[row][col] >= treeHeight) {
    return 1;
  }

  if (forest[row + 1] !== undefined) {
    return walkDown(row + 1, col, treeHeight) + 1;
  }

  return 1;
}

function walkLeft(row: number, col: number, treeHeight: number): number {
  if (forest[row][col] >= treeHeight) {
    return 1;
  }

  if (forest[row][col - 1] !== undefined) {
    return walkLeft(row, col - 1, treeHeight) + 1;
  }

  return 1;
}

function walkRight(row: number, col: number, treeHeight: number): number {
  if (forest[row][col] >= treeHeight) {
    return 1;
  }

  if (forest[row][col + 1] !== undefined) {
    return walkRight(row, col + 1, treeHeight) + 1;
  }

  return 1;
}

for (let row = 0; row < forest.length; row++) {
  for (let col = 0; col < forest[row].length; col++) {
    // if on outer wall, automatically has a scenic score of 0
    if (
      row === 0 ||
      col === 0 ||
      row === forest.length - 1 ||
      col === forest[row].length - 1
    ) {
      continue;
    }

    const scenicScore = walk(row, col);

    if (scenicScore > maxScenicScore) {
      maxScenicScore = scenicScore;
    }
  }
}

console.log("maxScenicScore", maxScenicScore);

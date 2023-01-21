const text = await Deno.readTextFile("./input.txt");

type Option = "ROCK" | "PAPER" | "SCISSORS";

const valueMap: Record<string, Option> = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
  X: "ROCK",
  Y: "PAPER",
  Z: "SCISSORS",
};

const pointMap: Record<Option, number> = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const winningMap: Record<Option, Option> = {
  ROCK: "SCISSORS",
  PAPER: "ROCK",
  SCISSORS: "PAPER",
};

const rounds = text.split("\n");

let pointTotal = 0;

for (const round of rounds) {
  // index 0 is opponent, index 1 is us
  const selections = round.split(" ");

  const opponent = valueMap[selections[0]];
  const self = valueMap[selections[1]];

  // A win
  if (winningMap[self] === opponent) {
    pointTotal += 6;
  }

  // A draw
  if (self === opponent) {
    pointTotal += 3;
  }

  // Gain no points for a loss

  // Point value for option chosen
  pointTotal += pointMap[self];
}

console.log(pointTotal);

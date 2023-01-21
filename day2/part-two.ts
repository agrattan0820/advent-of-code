const text = await Deno.readTextFile("./input.txt");

type Option = "ROCK" | "PAPER" | "SCISSORS";
type Outcome = "LOSE" | "DRAW" | "WIN";

const valueMap: Record<string, Option> = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
};

const outcomeMap: Record<string, Outcome> = {
  X: "LOSE",
  Y: "DRAW",
  Z: "WIN",
};

const pointMap: Record<Option, number> = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const losingMap: Record<Option, Option> = {
  ROCK: "PAPER",
  PAPER: "SCISSORS",
  SCISSORS: "ROCK",
};

const winningMap: Record<Option, Option> = {
  ROCK: "SCISSORS",
  PAPER: "ROCK",
  SCISSORS: "PAPER",
};

const rounds = text.split("\n");

let pointTotal = 0;

for (const round of rounds) {
  // index 0 is opponent, index 1 is the outcome
  const selections = round.split(" ");

  const opponent = valueMap[selections[0]];
  const outcome = outcomeMap[selections[1]];

  let self: Option = "ROCK"; // Initizalize self

  if (outcome === "LOSE") {
    self = winningMap[opponent];
  }

  if (outcome === "DRAW") {
    self = opponent;
    pointTotal += 3;
  }

  if (outcome === "WIN") {
    self = losingMap[opponent];
    pointTotal += 6;
  }

  // Point value for option chosen
  pointTotal += pointMap[self];
}

console.log(pointTotal);

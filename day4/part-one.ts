function getArrayRange(range: string) {
  const bounds = range.split("-");
  const lower = Number.parseInt(bounds[0]);
  const upper = Number.parseInt(bounds[1]);
  return Array.from(new Array(upper - lower + 1), (_, i) => i + lower);
}

const text = await Deno.readTextFile("./input.txt");

const pairs = text.split("\n");

// console.log(pairs);

let result = 0;

for (const pair of pairs) {
  const elves = pair.split(",");
  const firstRange = getArrayRange(elves[0]);
  const secondRange = getArrayRange(elves[1]);

  if (
    firstRange.length < secondRange.length &&
    firstRange.every((section) => secondRange.includes(section))
  ) {
    result++;
  }

  if (
    secondRange.length <= firstRange.length &&
    secondRange.every((section) => firstRange.includes(section))
  ) {
    result++;
  }
}

console.log(result);

const text = await Deno.readTextFile("./input.txt");

const elves = text.split("\n\n");

let max = 0;

const topThreeElves: number[] = new Array(3).fill(0);

for (const elf of elves) {
  const items = elf.split("\n");
  const calorieTotal = items.reduce(
    (acc, curr) => acc + Number.parseInt(curr),
    0
  );

  max = Math.max(max, calorieTotal);

  if (calorieTotal < topThreeElves[1]) {
    if (calorieTotal > topThreeElves[0]) {
      topThreeElves.shift();
      topThreeElves.unshift(calorieTotal);
    }
  } else {
    if (calorieTotal < topThreeElves[2]) {
      topThreeElves.shift();
      topThreeElves.splice(1, 0, calorieTotal);
    } else {
      topThreeElves.shift();
      topThreeElves.push(calorieTotal);
    }
  }
}

console.log(max);
console.log(topThreeElves.reduce((acc, curr) => acc + curr, 0));

const text = await Deno.readTextFile("./input.txt");

const rucksacks = text.split("\n");

function getCharValue(letter: string) {
  let val = letter.charCodeAt(0) - "A".charCodeAt(0) + 1;

  if (val > 32) {
    val -= 32;
  } else {
    val += 26;
  }

  return val;
}

let result = 0;

const groupSacks: Set<string>[] = [];

for (const rucksack of rucksacks) {
  const list = rucksack.split("");
  groupSacks.push(new Set(list));

  if (groupSacks.length === 3) {
    for (const item of groupSacks[0]) {
      if (groupSacks[1].has(item) && groupSacks[2].has(item)) {
        result += getCharValue(item);
      }
    }
    groupSacks.length = 0;
  }
}

console.log("result:", result);

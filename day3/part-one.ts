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

for (const rucksack of rucksacks) {
  const list = rucksack.split("");
  const half = Math.ceil(list.length / 2);

  const firstHalf = list.slice(0, half);
  const secondHalf = list.slice(half, list.length);

  const firstCompartment = new Set(firstHalf);
  const secondCompartment = new Set(secondHalf);

  for (const item of firstCompartment) {
    if (secondCompartment.has(item)) {
      result += getCharValue(item);
    }
  }

  console.log("size", list.length);
  console.log("half", half);
  console.log(list);
  console.log(firstHalf);
  console.log(secondHalf);
  console.log("\n");
}

console.log("result:", result);

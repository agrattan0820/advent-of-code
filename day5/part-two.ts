const text = await Deno.readTextFile("./input.txt");

const split = text.split("\n\n");

const stacks = split[0].split("\n");
const instructions = split[1].split("\n");

const arrayStacks: string[][] = Array.from({ length: 9 }, () => []);

for (let i = 0; i < stacks.length - 1; i++) {
  let pointer = 1;
  for (let j = 0; j < 9; j++) {
    const string = stacks[i].slice(pointer, pointer + 1);

    if (string !== " ") {
      arrayStacks[j].unshift(string);
    }

    pointer += 4;
  }
}

for (const instruction of instructions) {
  const amount = Number.parseInt(instruction.slice(5, 7));
  const fromIndex = Number.parseInt(instruction.slice(12, 14)) - 1;
  const toIndex = Number.parseInt(instruction.slice(17, 19)) - 1;

  arrayMove(amount, fromIndex, toIndex);
}

function arrayMove(amount: number, from: number, to: number) {
  const length = arrayStacks[from].length;
  const crates = arrayStacks[from].splice(length - amount, amount);
  arrayStacks[to] = [...arrayStacks[to], ...crates];
}

console.log(
  "Answer is: ",
  arrayStacks.map((stack) => stack[stack.length - 1])
);

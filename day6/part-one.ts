const text = await Deno.readTextFile("./input.txt");

let startPointer = 0;
let endPointer = 4;

while (
  new Set(text.slice(startPointer, endPointer)).size < 4 &&
  endPointer <= text.length
) {
  startPointer++;
  endPointer++;
}

console.log("Answer is", endPointer);
console.log("Marker was", text.slice(startPointer, endPointer));

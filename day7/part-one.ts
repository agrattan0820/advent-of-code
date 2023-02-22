const text = await Deno.readTextFile("./input.txt");

const instructions = text.split("\n");

type Node = {
  size: number;
  name: string;
  parent: Node | null;
  children: Record<string, Node> | null;
};

const root: Node = {
  size: 0,
  name: "/",
  parent: null,
  children: {},
};

let currNode = root;

instructions.forEach((instruction) => {
  const text = instruction.split(" ");
  const command = text[0] === "$";
  console.log(instruction);

  if (command) {
    if (text[1] === "cd") {
      if (text[2] === "/") {
        currNode = root;
      }
      if (text[2] === "..") {
        currNode = currNode?.parent ?? root;
      }
      if (text[2] !== "/" && text[2] !== ".." && currNode.children) {
        currNode = currNode?.children[text[2]];
      }
    }
  } else {
    if (text[0] === "dir" && currNode.children) {
      const newNode: Node = {
        size: 0,
        name: text[1],
        parent: currNode,
        children: {},
      };
      currNode.children[newNode.name] = newNode;
    } else if (currNode.children) {
      const newNode: Node = {
        size: Number.parseInt(text[0]),
        name: text[1],
        parent: currNode,
        children: null,
      };
      const saveNode = currNode;
      currNode.children[newNode.name] = newNode;
      while (currNode.parent !== null) {
        const childrenTotal = Object.values(currNode.children ?? {}).reduce(
          (acc, curr) => acc + curr.size,
          0
        );
        currNode.size = childrenTotal;
        currNode = currNode.parent;
      }
      const rootChildrenTotal = Object.values(currNode.children ?? {}).reduce(
        (acc, curr) => acc + curr.size,
        0
      );
      currNode.size = rootChildrenTotal;
      currNode = saveNode;
    }
  }
  console.log("currNode", currNode.name);
  // console.log("\n");
});

const rec_total = (total: number, node: Node) => {
  if (node.size < 10000) {
    total += node.size;
  }

  if (node.children) {
    const map: number[] = Object.values(node.children).map((node) => {
      return rec_total(total, node);
    });

    const childrenTotal = map.reduce((acc, curr) => acc + curr, 0);

    return childrenTotal;
  }

  return total;
};

console.log(rec_total(0, root));

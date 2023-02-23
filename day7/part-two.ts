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
      currNode.children[newNode.name] = newNode;
      const saveNode = currNode;
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
});

let targetDir: Node = {
  size: Number.MAX_VALUE,
  name: "large",
  parent: null,
  children: null,
};

const rec_total = (node: Node) => {
  const works = 70000000 - (root.size - node.size) > 30000000;
  if (node.children && works && node.size < targetDir.size) {
    targetDir = node;
  }

  if (node.children) {
    Object.values(node.children).forEach((childNode) => {
      rec_total(childNode);
    });
  }
};

rec_total(root);

console.log("Answer:", targetDir.size);

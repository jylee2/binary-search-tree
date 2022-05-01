const test = require("ava");

const { BinarySearchTree } = require("./index");

test("binary-search-tree", (t) => {
  const mockData = [
    { name: "batman", powers: ["rich"] },
    { name: "aquaman", powers: ["swimming"] },
  ];

  const BST = new BinarySearchTree(mockData, "name");
  BST.insert({ name: "catwoman", powers: ["meow"] });

  const res = BST.getAllData();
  const binaryTree = res.binaryTree;
  t.truthy(binaryTree);
});

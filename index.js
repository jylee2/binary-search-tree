const { BinarySearchTree } = require("./BinarySearchTree");

const data = [
  { name: "batman", powers: ["rich"] },
  { name: "aquaman", powers: ["swimming"] },
];

const BST = new BinarySearchTree(data, "name");

BST.insert({ name: "catwoman", powers: ["cats"] });

const binaryTree = BST.getAllData().binaryTree;
console.log("--------binaryTree", binaryTree);

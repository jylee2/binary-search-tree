const { BinarySearchTreeBasic } = require("./BinarySearchTreeBasic");

const BST = new BinarySearchTreeBasic();
BST.insert("batman");
BST.insert("aquaman");
BST.insert("catwoman");

console.log("--------BST.getRootNode()", BST.getRootNode());

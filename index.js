const {
  checkExisting,
  groupByPrimaryKey,
  getKeysForIndexing,
} = require("./utils");

class Node {
  constructor(data) {
    this.value = data;
    this.left = null;
    this.right = null;
  }
}

/*
@params
- Example dataArray: [
    { name: "batman", powers: ["rich"] },
    { name: "aquaman", powers: ["swimming"] },
  ]
- Example primaryKey: "name"
*/

class BinarySearchTree {
  constructor(primaryKey) {
    this.root = null;
    this.indexedData = {};
    this.primaryKey = primaryKey;
  }

  insert(data) {
    checkExisting(data, this.indexedData, this.primaryKey);

    this.indexedData[data[this.primaryKey]] = data;

    const newNode = new Node(data);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    return this.recursivelyInsertNode(this.root, newNode);
  }

  nukeAndRecomputeBST() {
    const sortedKeys = getKeysForIndexing(this.indexedData);
    if (!sortedKeys?.length) return;

    // nuke
    this.root = null;

    // recompute
    sortedKeys.forEach((key) => {
      const newData = this.indexedData[key];
      const newNode = new Node(newData);

      if (!this.root) {
        this.root = newNode;
      } else {
        this.recursivelyInsertNode(this.root, newNode);
      }
    });
  }

  recursivelyInsertNode(node, newNode) {
    if (newNode.value[this.primaryKey] < node.value[this.primaryKey]) {
      if (!node.left) {
        node.left = newNode;
        return;
      }

      return this.recursivelyInsertNode(node.left, newNode);
    }

    if (!node.right) {
      node.right = newNode;
      return;
    }

    return this.recursivelyInsertNode(node.right, newNode);
  }

  getAllData() {
    return {
      binaryTree: this.root,
      indexedData: this.indexedData,
      primaryKey: this.primaryKey,
    };
  }

  traverse() {
    if (!this.root) return;

    const leftNodes = [];
    let currentNode = this.root;
    const result = [];

    while (currentNode || leftNodes.length) {
      // Reach the left most Node of the currentNode Node
      while (currentNode) {
        // place pointer to a tree node on the stack before traversing the node's left subtree
        leftNodes.push(currentNode);
        currentNode = currentNode.left;
      }

      // currentNode is null, assign as last leftNode
      currentNode = leftNodes.pop();

      result.push(currentNode.value);

      // visited the node and its left subtree. Now, it's right subtree's turn
      currentNode = currentNode.right;
    }

    return result;
  }
}

module.exports = { BinarySearchTree, groupByPrimaryKey };

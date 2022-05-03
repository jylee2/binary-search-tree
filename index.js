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
    console.log("--------this.root", this.root);

    const result = [this.root.value];

    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.left) {
        result.unshift(currentNode.left);
      }
      currentNode = currentNode.left;
    }

    currentNode = result[0];
    while (currentNode) {
      if (currentNode.right) {
        console.log("--------currentNode.right", currentNode.right);
        // result.push(currentNode.right.value);
      }
      currentNode = currentNode.right;
    }

    return result;
  }
}

module.exports = { BinarySearchTree, groupByPrimaryKey };

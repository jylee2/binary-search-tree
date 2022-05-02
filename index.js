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
  constructor(dataArray, primaryKey) {
    this.root = null;
    this.indexedData = groupByPrimaryKey(dataArray, primaryKey) || {};
    this.primaryKey = primaryKey;
  }

  insert(data) {
    const newElement = { ...data };

    checkExisting(newElement, this.indexedData, this.primaryKey);

    // insert data
    this.indexedData[data[this.primaryKey]] = data;

    this.nukeAndRecomputeBST();
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
}

module.exports = { BinarySearchTree, groupByPrimaryKey };

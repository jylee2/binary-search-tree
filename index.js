const uniqBy = require("lodash/uniqBy");
const isArray = require("lodash/isArray");

class Node {
  constructor(data) {
    this.value = data;
    this.left = null;
    this.right = null;
  }
}

const validateData = (dataArray, primaryKey) => {
  if (!primaryKey) {
    throw new Error("Please specify the primary key.");
  }
  if (!isArray(dataArray)) {
    throw new Error("Data should be an array.");
  }
};

const groupByPrimaryKey = (dataArray, primaryKey) => {
  if (!dataArray?.length) return;
  validateData(dataArray, primaryKey);

  const uniqData = uniqBy(dataArray.filter(Boolean), primaryKey);

  return uniqData.reduce((res, data) => {
    if (!res[data[primaryKey]]) {
      res[data[primaryKey]] = data;
    }
    return res;
  }, {});
};

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

  checkExisting(data) {
    const foundExisting = this.indexedData[data[this.primaryKey]];

    if (foundExisting) {
      throw new Error(`${data[this.primaryKey]} already exists.`);
    }
  }

  insert(data) {
    const newElement = { ...data };

    this.checkExisting(newElement);

    // insert data
    this.indexedData[data[this.primaryKey]] = data;

    this.nukeAndRecomputeBST();
  }

  nukeAndRecomputeBST() {
    const primaryKeys = Object.keys(this.indexedData);
    if (!primaryKeys?.length) return;

    // nuke
    this.root = null;

    // recompute
    primaryKeys.forEach((key) => {
      const newData = this.indexedData[key];

      if (!this.root) {
        const newNode = new Node(newData);
        this.root = newNode;
      } else {
        this.recursiveInsertNode(this.root, newData);
      }
    });
  }

  recursiveInsertNode(node, data) {
    const newNode = new Node(data);

    if (node.value[this.primaryKey] < newNode.value[this.primaryKey]) {
      if (!node.left) {
        node.left = newNode;
        return;
      }

      return this.recursiveInsertNode(node.left, newNode);
    }

    if (!node.right) {
      node.right = newNode;
      return;
    }

    return this.recursiveInsertNode(node.right, newNode);
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

const test = require("ava");

const { BinarySearchTree } = require("./index");
const { sortArray, groupByPrimaryKey, getKeysForIndexing } = require("./utils");

const mockData = [
  { name: "batman", powers: ["rich"] },
  { name: "aquaman", powers: ["swimming"] },
  { name: "superman", powers: ["flying"] },
  { name: "catwoman", powers: ["meow"] },
  { name: "ironman", powers: ["also rich"] },
  { name: "brad traversy", powers: ["traverse"] },
];

test("binary-search-tree - insert", (t) => {
  const BST = new BinarySearchTree("name");

  mockData.forEach((d) => BST.insert(d));

  const res = BST.getAllData();
  const indexedData = res.indexedData;
  t.truthy(indexedData["brad traversy"]);

  const binaryTree = res.binaryTree;
  t.is(binaryTree.value.name, "batman");
  t.is(binaryTree.left.value.name, "aquaman");
  t.is(binaryTree.right.value.name, "superman");
});

test("binary-search-tree - traverse", (t) => {
  const BST = new BinarySearchTree("name");

  mockData.forEach((d) => BST.insert(d));

  const res = BST.traverse().map((r) => r.name);
  const keys = sortArray(Object.keys(BST.getAllData().indexedData));

  const difference = [];
  for (let i = 0; i < keys.length; i++) {
    if (res[i] !== keys[i]) {
      difference.push(res[i]);
    }
  }

  t.is(res.length, 6);
  t.is(difference.length, 0);
});

test("utils - groupByPrimaryKey", (t) => {
  const groupedData = groupByPrimaryKey(mockData, "name");
  t.truthy(groupedData);

  const keys = Object.keys(groupedData);
  t.is(keys.length, 6);
  t.is(keys[0], "batman");
  t.is(groupedData["batman"].name, "batman");
});

test("utils - sortArray", (t) => {
  const testArray = ["b", "a", "c"];

  const sortedKeys = sortArray(testArray);
  t.is(sortedKeys.length, 3);
  t.is(sortedKeys[0], "a");
});

test("utils - getKeysForIndexing", (t) => {
  const groupedData = {
    batman: { name: "batman", powers: ["rich"] },
    aquaman: { name: "aquaman", powers: ["swimming"] },
    superman: { name: "superman", powers: ["flying"] },
  };

  const sortedKeys = getKeysForIndexing(groupedData);
  t.is(sortedKeys.length, 3);
  t.is(sortedKeys[0], "batman");
});

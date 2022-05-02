const test = require("ava");

const { BinarySearchTree } = require("./index");
const { sortArray, groupByPrimaryKey, getKeysForIndexing } = require("./utils");

const mockData = [
  { name: "batman", powers: ["rich"] },
  { name: "aquaman", powers: ["swimming"] },
  { name: "superman", powers: ["flying"] },
];

test("binary-search-tree - insert", (t) => {
  const BST = new BinarySearchTree(mockData, "name");
  BST.insert({ name: "catwoman", powers: ["meow"] });

  const res = BST.getAllData();
  const indexedData = res.indexedData;
  t.truthy(indexedData["catwoman"]);

  const binaryTree = res.binaryTree;
  t.is(binaryTree.value.name, "catwoman");
  t.is(binaryTree.left.value.name, "aquaman");
  t.is(binaryTree.right.value.name, "superman");
});

test("binary-search-tree - traverse", (t) => {
  const BST = new BinarySearchTree(mockData, "name");
  BST.insert({ name: "brad traversy", powers: ["traverse"] });
  BST.insert({ name: "ironman", powers: ["also rich"] });

  const res = BST.traverse();
  t.is(res.length, 5);
});

test("utils - groupByPrimaryKey", (t) => {
  const groupedData = groupByPrimaryKey(mockData, "name");
  t.truthy(groupedData);

  const keys = Object.keys(groupedData);
  t.is(keys.length, 3);
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

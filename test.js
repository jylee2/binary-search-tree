const test = require("ava");

const { BinarySearchTree } = require("./index");
const { groupByPrimaryKey } = require("./utils");

const mockData = [
  { name: "batman", powers: ["rich"] },
  { name: "aquaman", powers: ["swimming"] },
  { name: "superman", powers: ["flying"] },
];

test("group-by-primary-key", (t) => {
  const groupedData = groupByPrimaryKey(mockData, "name");
  t.truthy(groupedData);

  const keys = Object.keys(groupedData);
  t.is(keys.length, 3);
  t.is(keys[0], "batman");
  t.is(groupedData["batman"].name, "batman");
});

test("binary-search-tree - insert", (t) => {
  const BST = new BinarySearchTree(mockData, "name");
  BST.insert({ name: "catwoman", powers: ["meow"] });

  const res = BST.getAllData();
  const indexedData = res.indexedData;
  t.truthy(indexedData["catwoman"]);

  const binaryTree = res.binaryTree;
  t.truthy(binaryTree);
});

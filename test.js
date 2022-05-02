const test = require("ava");

const { BinarySearchTree, groupByPrimaryKey } = require("./index");

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

test("binary-search-tree", (t) => {
  const BST = new BinarySearchTree(mockData, "name");
  BST.insert({ name: "catwoman", powers: ["meow"] });

  const res = BST.getAllData();
  const binaryTree = res.binaryTree;
  t.truthy(binaryTree);
});

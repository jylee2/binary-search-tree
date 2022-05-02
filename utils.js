const uniqBy = require("lodash/uniqBy");
const isArray = require("lodash/isArray");

const checkExisting = (data, indexedData, primaryKey) => {
  const foundExisting = indexedData[data[primaryKey]];

  if (foundExisting) {
    throw new Error(`${data[primaryKey]} already exists.`);
  }
};

const validateInput = (dataArray, primaryKey) => {
  if (!primaryKey) {
    throw new Error("Please specify the primary key.");
  }

  if (!isArray(dataArray)) {
    throw new Error("Data should be an array.");
  }
};

const groupByPrimaryKey = (dataArray, primaryKey) => {
  if (!dataArray?.length) return;
  validateInput(dataArray, primaryKey);

  const uniqData = uniqBy(dataArray.filter(Boolean), primaryKey);

  return uniqData.reduce((res, data) => {
    if (!res[data[primaryKey]]) {
      res[data[primaryKey]] = data;
    }

    return res;
  }, {});
};

const getKeysForIndexing = (indexedData) => {
  const primaryKeys = Object.keys(indexedData);
  if (!primaryKeys?.length) return;

  const sortedKeys = primaryKeys.sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }

    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    }
  });

  const sliced = sortedKeys
    .slice(sortedKeys.length / 2, sortedKeys.length)
    .concat(sortedKeys.slice(0, sortedKeys.length / 2));

  return sliced;
};

module.exports = {
  checkExisting,
  groupByPrimaryKey,
  getKeysForIndexing,
};

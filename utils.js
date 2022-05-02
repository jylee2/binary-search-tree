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

module.exports = { checkExisting, groupByPrimaryKey };

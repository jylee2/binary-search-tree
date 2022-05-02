const uniqBy = require("lodash/uniqBy");
const isArray = require("lodash/isArray");

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

module.exports = { groupByPrimaryKey };

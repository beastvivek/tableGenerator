const fs = require('fs');
const { log } = require('console');

const createObj = (headers, record) => {
  const obj = {};
  for (let index = 0; index < headers.length; index++) {
    obj[headers[index]] = +record[index];
    if (isNaN(obj[headers[index]])) {
      obj[headers[index]] = record[index];
    }
  }
  return obj;
};

const generateObject = (headers, delimiter) => {
  return function (element) {
    const elementStats = element.split(delimiter);
    return createObj(headers, elementStats);
  };
};

const arrayToObject = (data, delimiter) => {
  const headers = data[0].split(delimiter);
  return data.map(generateObject(headers, delimiter));
};

const readData = (filePath) => {
  let data;
  try {
    data = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    log(error.message);
  }
  return data;
};

const csvToObject = (filePath, delimiter) => {
  return arrayToObject(readData(filePath).split('\n'), delimiter);
};

exports.csvToObject = csvToObject;

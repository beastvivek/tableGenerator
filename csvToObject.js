const fs = require('fs');
const { log } = require('console');

const createStock = (movieRecord) => {
  return {
    'symbol': movieRecord[0],
    'name': movieRecord[1],
    'sector': movieRecord[2],
    'price': movieRecord[3],
    'pe': movieRecord[4],
    'divyield': movieRecord[5],
    'eps': movieRecord[6],
    '52weeklow': movieRecord[7],
    '52weekhigh': movieRecord[8],
    'marketcap': movieRecord[9],
    'ebitda': movieRecord[10],
    'ps': movieRecord[11],
    'pb': movieRecord[12],
  };
};

const generateObject = (stock) => {
  const movieStat = stock.split(',');
  return createStock(movieStat);
};

const arrayToObject = (stocksData) => stocksData.map(generateObject);

const readData = (filePath) => {
  let stocksData;
  try {
    stocksData = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    log(error.message);
  }
  return stocksData;
};

const csvToObject = (filePath) => {
  return arrayToObject(readData(filePath).split('\r\n'));
};

exports.csvToObject = csvToObject;
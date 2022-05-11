const fs = require('fs');
const { log } = require('console');

const { csvToObject } = require('./csvToObject.js');

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;
const SIX = 6;

const tableData = (tableData) => {
  return '<td>' + tableData + '</td>';
};

const tableHeading = (heading, classAttr) => {
  return '<th class="' + classAttr + '">' + heading + '</th>';
};

const tableRow = (rows, stock) => {
  let rowData = '';
  for (const key in stock) {
    rowData = rowData + tableData(stock[key]);
  }
  return rows + '<tr>' + rowData + '</tr>';
};

const tableHead = (stock) => {
  let header = '';
  for (const key in stock) {
    header = header + tableHeading(stock[key], key);
  }
  return '<thead>' + '<tr>' + header + '</tr>' + '</thead>';
};

const ifGreater = (key) => {
  return function isGreater(object1, object2) {
    return object1[key] - object2[key];
  };
};

const fieldToKey = (object, field) => {
  for (const key in object) {
    if (object[key] === field) {
      return key;
    }
  }
};

const sort = (array, key) => {
  const data = array.slice(ONE);
  data.sort(ifGreater(key));
  data.unshift(array[ZERO]);
  return data;
};

const tableBody = (stocks) => {
  const body = stocks.reduce(tableRow, '');
  return '<tbody>' + body + '</tbody>';
};

const generateTable = (stocks, key) => {
  const sortedStocks = sort(stocks, key);
  const header = tableHead(sortedStocks[ZERO]);
  const body = tableBody(sortedStocks.slice(ONE));
  return '<table>' + header + body + '</table>';
};

const generateHeading = (heading) => '<h1>' + heading + '</h1>';

const body = (stocks, key) => {
  const heading = generateHeading('Stock Table');
  const table = generateTable(stocks, key);
  const body = heading + table;
  return '<body>' + body + '</body>';
};

const head = () => {
  const titleTag = '<title>Stocks</title>';
  const linkTag = '<link rel="stylesheet" href="styles.css"/>';
  return '<head>' + titleTag + linkTag + '</head>';
};

const html = (stocks, key) => {
  const htmlHead = head();
  const htmlBody = body(stocks, key);
  return '<html>' + htmlHead + htmlBody + '</html>';
};

const writeToHtml = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, data, 'utf8');
  } catch (error) {
    log(error.message, error.stack);
  }
};

const readCss = (filePath) => {
  let data;
  try {
    data = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    log(error.message, error.stack);
  }
  return data;
};

const generateStyling = (classAttr) => {
  return '.' + classAttr + '{background-color: rgb(200,200,200);}';
};

const writeToCss = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, data, 'utf8');
  } catch (error) {
    log(error.message, error.stack);
  }
};

const main = function (htmlFilePath, csvFilePath,
  stylesFilePath, cssFilePath, sortingField) {
  const data = csvToObject(csvFilePath);
  const cssData = readCss(stylesFilePath);
  const headers = data[ZERO];
  const selectedKey = fieldToKey(headers, sortingField);
  writeToCss(cssFilePath, cssData + generateStyling(selectedKey));
  writeToHtml(htmlFilePath, html(data, selectedKey));
};

const htmlFilePath = process.argv[TWO];
const csvFilePath = process.argv[THREE];
const stylesFilePath = process.argv[FOUR];
const cssFilePath = process.argv[FIVE];
const sortingField = process.argv[SIX];

main(htmlFilePath, csvFilePath, stylesFilePath, cssFilePath, sortingField);

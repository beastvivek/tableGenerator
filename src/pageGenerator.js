const fs = require('fs');
const { log } = require('console');

const { csvToObject } = require('./csvToObject.js');

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;

const generateTag = (tag, content) => {
  return '<' + tag + '>' + content + '</' + tag + '>';
};

const tableData = (tableData) => {
  return generateTag('td', tableData);
};

const tableHeading = (heading, classAttr) => {
  return '<th class="' + classAttr + '">' + heading + '</th>';
};

const tableRow = (rows, stock) => {
  let rowData = '';
  for (const key in stock) {
    rowData = rowData + tableData(stock[key]);
  }
  return rows + generateTag('tr', rowData);
};

const tableHead = (stock, selectedKey) => {
  let header = '';
  for (const key in stock) {
    let classAttr = key;
    if (key === selectedKey) {
      classAttr = key + ' sortedBy';
    }
    header = header + tableHeading(stock[key], classAttr);
  }
  return generateTag('thead', generateTag('tr', header));
};

const ifGreater = (key) => {
  return function isGreater(object1, object2) {
    return object1[key] - object2[key];
  };
};

const sort = (array, key) => {
  const data = array.slice(ONE);
  data.sort(ifGreater(key));
  data.unshift(array[ZERO]);
  return data;
};

const tableBody = (stocks) => {
  const body = stocks.reduce(tableRow, '');
  return generateTag('tbody', body);
};

const generateTable = (stocks, key) => {
  const sortedStocks = sort(stocks, key);
  const header = tableHead(sortedStocks[ZERO], key);
  const body = tableBody(sortedStocks.slice(ONE));
  return generateTag('table', header + body);
};

const generateHeading = (heading) => '<h1>' + heading + '</h1>';

const body = (stocks, key) => {
  const heading = generateHeading('Table sorted according to a field');
  const table = generateTable(stocks, key);
  const body = heading + table;
  return generateTag('body', body);
};

const head = () => {
  const titleTag = '<title>Table</title>';
  const linkTag = '<link rel="stylesheet" href="styles.css"/>';
  return generateTag('head', titleTag + linkTag);
};

const html = (stocks, key) => {
  const htmlHead = head();
  const htmlBody = body(stocks, key);
  return generateTag('html', htmlHead + htmlBody);
};

const writeToHtml = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, data, 'utf8');
  } catch (error) {
    log(error.message, error.stack);
  }
};

const main = function ({ htmlFilePath, csvFilePath }, sortingField, delimiter) {
  const data = csvToObject(csvFilePath, delimiter);
  writeToHtml(htmlFilePath, html(data, sortingField));
};

const htmlFilePath = process.argv[TWO];
const csvFilePath = process.argv[THREE];
const sortingField = process.argv[FOUR];
const delimiter = process.argv[FIVE];
const paths = { htmlFilePath, csvFilePath };

main(paths, sortingField, delimiter);

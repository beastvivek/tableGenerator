#! /bin/bash

rm -r html 2> /dev/null
mkdir html

html_file_path='./html/stocksTable.html'
csv_file_path='./data/stocksData.csv'
styles_file_path='./data/styles.css'
css_file_path='./html/styles.css'

echo -e $(head -n1 data/stocksData.csv |cut -d ',' -f 4- | sed 's/,/\\n/g')

read -p 'Enter the field according to which you want to sort  ' field

node pageGenerator.js ${html_file_path} ${csv_file_path} ${styles_file_path} ${css_file_path} "${field}"

open html/stocksTable.html

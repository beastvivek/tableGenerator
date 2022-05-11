#! /bin/bash

echo -e $(head -n1 stocksData.csv | sed 's/,/\\n/g')

read -p 'Enter the field according to which you want to sort  ' field

node pageGenerator.js $field

open stocksTable.html

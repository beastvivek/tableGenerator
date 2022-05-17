#! /bin/bash

rm -r html 2> /dev/null
mkdir html

html_file_path='./html/index.html'
csv_file_path='./data/ten.csv'
cp './data/styles.css' './html/styles.css'

delimiter='|'

echo -e $(head -n1 ${csv_file_path} | cut -d ${delimiter} -f 4- | sed 's/|/\\n/g')

read -p 'Enter the field according to which you want to sort  ' field

node pageGenerator.js ${html_file_path} ${csv_file_path} "${field}" "${delimiter}"

open index.html

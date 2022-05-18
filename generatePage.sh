#! /bin/bash

rm -r html index.html styles.css 2> /dev/null
mkdir html

html_file_path='./html/index.html'
csv_file_path='./data/ten.csv'
styles_file_path='./html/styles.css'
cp './data/styles.css' ${styles_file_path}

delimiter='|'

echo -e $(head -n1 ${csv_file_path} | cut -d ${delimiter} -f 4- | sed 's/|/\\n/g')

read -p 'Enter the field according to which you want to sort  ' field

node src/pageGenerator.js ${html_file_path} ${csv_file_path} "${field}" "${delimiter}"

ln -s ${html_file_path} index.html
ln -s ${styles_file_path} styles.css

open index.html

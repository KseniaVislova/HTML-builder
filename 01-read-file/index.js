const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const stream = fs.ReadStream(pathToFile, 'utf8');

stream.on('data', (data) => {
  (err) => {
    if (err) throw err;
  }
  console.log(data);
});
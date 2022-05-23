const path = require('path');
const fs = require('fs');
const folderPath = path.join(__dirname, 'secret-folder/');

const getFiles = () => {
  fs.readdir(folderPath, {encoding: 'utf-8', withFileTypes: true}, (error, files) => {
    if (error) throw error;
    for (const file of files) {
      if (file.isFile()) {
        fs.stat(path.join(folderPath, file.name), (error, stats) => {
          if (error) throw error;
          console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).split('.')[1]} - ${stats.size / 1024} кб`);
        })
      }
    }
  });
}

getFiles();
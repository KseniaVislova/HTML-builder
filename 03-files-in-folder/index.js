const path = require('path');
const {readdir} = require('fs/promises');
const fs = require('fs');
const folderPath = path.join(__dirname, 'secret-folder/');

const getFiles = async() => {
  try {
    const files = await readdir(folderPath, {encoding: 'utf-8', withFileTypes: true});
    for await (const file of files) {
      if (file.isFile()) {
        let size =  await fs.promises.stat(path.join(folderPath, file.name))
        console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).split('.')[1]} - ${size.size / 1024} кб`)
      }
    }
  } catch (err) {
    console.error(err);
  }
}

getFiles()
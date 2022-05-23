const fs = require('fs');
const {readdir} = require('fs/promises');
const path = require('path');
const folderPath = path.join(__dirname, 'files/');
const newFolderPath = path.join(__dirname, 'newfiles/');
const constants = require('constants');

const makeFolder = (path) => {
  fs.mkdir(path, { recursive: true }, err => {
    if (err) throw err;
  });
}

const copyDir = async() => {
  function callback() {
    if (err) throw err;
  }
  makeFolder(newFolderPath);
  try {
    const files = await readdir(folderPath, {encoding: 'utf-8', withFileTypes: true});
    for await (const file of files) {
      if (file.isFile()) {
        await fs.promises.copyFile(path.join(folderPath, file.name), path.join(newFolderPath, file.name), constants.COPYFILE_FICLONE, callback);
      }
    }
  } catch(err) {
    console.error(err);
  }
}

copyDir();

const fs = require('fs/promises');
const {readdir} = require('fs/promises');
const path = require('path');
const assets = path.join(__dirname, 'files');
const newFolderPath = path.join(__dirname, 'files-copy');
const constants = require('constants');

const copyDir = async() => {
  function callback() {
    if (err) throw err;
  }
  try {
    const files = await readdir(assets, {encoding: 'utf-8', withFileTypes: true});
    for await (const file of files) {
      if (file.isFile()) {
        await fs.copyFile(path.join(assets, file.name), path.join(newFolderPath, file.name), constants.COPYFILE_FICLONE, callback);
      }
    }
  } catch(err) {
    console.error(err);
  }
}

fs.rm(newFolderPath, {force: true, recursive: true})
  .then(() => {
    fs.mkdir(newFolderPath)
      .then(() => copyDir())
      .catch(err => console.log('Не удалось создать папку: ', err.code));
  });
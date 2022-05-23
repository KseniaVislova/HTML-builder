const fs = require('fs');
const path = require('path');
const constants = require('constants');

const dist = path.join(__dirname, 'project-dist/');
const css = path.join(__dirname, 'styles/');
const distCSS = path.join(__dirname, 'project-dist', 'style.css');
const assets = path.join(__dirname, 'assets/');
const newAssets = path.join(dist, 'assets/');

const deleteFiles = async(p) => {
  const files = await fs.promises.readdir(p, {encoding: 'utf-8', withFileTypes: true});
  for (const file of files) {
    if(file.isFile()) {
      fs.unlink(path.join(p, file.name), (err) => {
        if (err) throw err;
      });
    }
    if(file.isDirectory()) {
      deleteFiles(path.join(p, file.name))
    }
  }
}


const makeFolder = async(p) => {
  fs.mkdir(p, { recursive: true }, err => {
    if (err) throw err;
  });
}

const readFile = async(p, file) => {
  const pathToFile = path.join(p, file);
  const stream = fs.createReadStream(pathToFile, 'utf8');

  const chunks = [];
  for await (const chunk of stream) {
      chunks.push(chunk);
  }
  return chunks.toString().trim();
}

const createHTML = async () => {
  let template = await readFile(__dirname, 'template.html');
  let pathFiles = path.join(__dirname, 'components')
  const files = await fs.promises.readdir(pathFiles, {encoding: 'utf-8', withFileTypes: true});

  for (const file of files) {
    if (file.isFile() && path.extname(file.name).split('.')[1] === 'html') {
      let inner = await readFile(pathFiles, file.name)
      const name = file.name.split('.')[0]
      template = template.replace(`{{${name}}}`, `${inner}`)
    }
  }

  await deleteFiles(dist);

  fs.writeFile(
    path.join(dist, 'index.html'),
    `${template}`,
    (err) => {
        if (err) throw err;
    }
  );
}

const createCSS = () => {
  fs.readdir(css, {encoding: 'utf-8', withFileTypes: true}, (err, files) => {
    if (err) throw err;
    fs.writeFile(
      distCSS,
      ``,
      (err) => {
          if (err) throw err;
      }
    );

    files = files.reverse();
    
    for (const file of files) {
      if (file.isFile() && path.extname(file.name).split('.')[1] === 'css') {
        const pathToFile = path.join(css, file.name);
        const stream = fs.createReadStream(pathToFile, 'utf8');
  
        stream.on('data', (data) => {
          fs.appendFile(
            distCSS,
            data,
            (err) => {
                if (err) throw err;
            }
          );
        });
      }
    }
  });
}

const copyDir = async(p, nameFolder) => {
  function callback() {
    if (err) throw err;
  }
  makeFolder(nameFolder);
  try {
    const files = await fs.promises.readdir(path.join(assets, p), {encoding: 'utf-8', withFileTypes: true});
    for await (const file of files) {
      if (file.isFile()) {
        await fs.promises.copyFile(path.join(assets, p, file.name), path.join(nameFolder, file.name), constants.COPYFILE_FICLONE, callback);
      }
      if (file.isDirectory()) {
        copyDir(file.name, path.join(nameFolder, file.name))
      }
    }
  } catch(err) {
    console.error(err);
  }
}

const buildProject = async() => {
  await makeFolder(dist)
  await createHTML()
  createCSS()
  await copyDir('', newAssets)
}

buildProject();

const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'styles/');
const dist = path.join(__dirname, 'project-dist', 'bundle.css');


fs.readdir(src, {encoding: 'utf-8', withFileTypes: true}, (err, files) => {
  if (err) throw err;

  fs.writeFile(
    dist,
    ``,
    (err) => {
        if (err) throw err;
    }
  );
  
  for (const file of files) {
    if (file.isFile() && path.extname(file.name).split('.')[1] === 'css') {
      const pathToFile = path.join(src, file.name);
      const stream = fs.createReadStream(pathToFile, 'utf8');

      stream.on('data', (data) => {
        fs.appendFile(
          dist,
          data,
          (err) => {
              if (err) throw err;
          }
        );
      });
    }
  }
});

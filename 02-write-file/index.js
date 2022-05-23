var readline = require('readline');
const fs = require('fs');
const path = require('path');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = '';

rl.output.write('Привет! Введи текст для файла!\n');
fs.writeFile(
  path.join(__dirname, 'text.txt'),
  ``,
  (err) => {
      if (err) throw err;
  }
);

rl.on('line', function (data) {
  input = data.toString();
  if (input === 'exit') {
    console.log(`Процесс ввода завершен! Удачи!`);
    process.exit(0);
  }
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    `${input}\n`,
    (err) => {
        if (err) throw err;
    }
  );
});


rl.on('close', function (cmd) {
  console.log(`Процесс ввода завершен! Удачи!`);
  process.exit(0);
});

rl.on('SIGINT', function (cmd) {
  console.log(`Процесс ввода завершен! Удачи!`);
  process.exit(0);
});
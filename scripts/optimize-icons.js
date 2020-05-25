#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { ncp } = require('ncp'); // eslint-disable-line import/no-extraneous-dependencies
const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const { Spinner } = require('cli-spinner'); // eslint-disable-line import/no-extraneous-dependencies
const { say } = require('cowsay'); // eslint-disable-line import/no-extraneous-dependencies
const SVGO = require('svgo'); // eslint-disable-line import/no-extraneous-dependencies

const { log } = console;

ncp.limit = 16;

const DEST_DIR = './src/icons/';

log(say({ text: chalk`{yellow Calma aí parça}, estou otimizando os ícones.` }));

const readDir = dirpath => new Promise((resolve, reject) => {
  fs.readdir(dirpath, (err, files) => {
    if (err) return reject(new Error(chalk`\n{red.bold ✖ Directory reading failed:}\n{white ${err}}\n`));

    return resolve(files);
  });
});

const readFile = filepath => new Promise((resolve, reject) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) return reject(new Error(chalk`\n{red.bold ✖ File reading failed:}\n{white ${err}}\n`));

    return resolve(data);
  });
});

const writeFile = (filepath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filepath, data, 'utf8', (err) => {
    if (err) return reject(new Error(chalk`\n{red.bold ✖ File writing failed:}\n{white ${err}}\n`));

    return resolve();
  });
});

const svgoAddViewBoxPlugin = (item) => {
  if (
    item.isElem(['svg']) &&
    !item.hasAttr('viewBox') &&
    item.hasAttr('width') &&
    item.hasAttr('height')
  ) {
    const width = parseFloat(item.attr('width').value.replace(/px$/, ''));
    const height = parseFloat(item.attr('height').value.replace(/px$/, ''));
    item.removeAttr('width');
    item.removeAttr('height');
    item.addAttr({
      name: 'viewBox',
      prefix: '',
      local: 'viewBox',
      value: `0 0 ${width} ${height}`,
    });
  }
};

const optimizeIcons = async (directoryPath) => {
  const loader = new Spinner();
  loader.start();

  const svgo = new SVGO({
    plugins: [{
      svgoAddViewBoxPlugin: {
        type: 'perItem',
        name: 'svgoAddViewBoxPlugin',
        fn: svgoAddViewBoxPlugin,
      },
    }],
  });
  const files = await readDir(directoryPath);

  const result = await Promise.all(files.map(async (file) => {
    const filepath = path.join(directoryPath, file);
    const svg = await readFile(filepath);
    const optimizedSvg = await svgo.optimize(svg);
    await writeFile(filepath, optimizedSvg.data);
    return filepath;
  }));

  loader.stop(true);

  return result;
};

async function main() {
  try {
    await optimizeIcons(DEST_DIR);

    log(say({ text: chalk`{green.bold Tudo certo parça!}` }));
  } catch (e) {
    log(e.message);
    process.exit(1);
  }
}

main();

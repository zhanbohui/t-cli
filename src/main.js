const program = require('commander');
const path = require('path');

const { version } = require('./utils/constants');

const actionsMap = {
  create: { // 创建模版
    description: 'create project',
    alias: 'cr',
    examples: [
      't-cli create <template-name>',
    ],
  },
  config: {
    description: 'config info',
    alias: 'c',
    examples: [
      't-cli config get <k>',
      't-cli config set <k> <v>',
    ],
  },
  '*': {
    description: 'command not found',
  },
};

Object.keys(actionsMap).forEach(action => {
  program.command(action)
    .alias(actionsMap[action].alias)
    .description(actionsMap[action].description)
    .action(() => {
      if (action === '*') {
        console.log(actionsMap[action].description);
      } else {
        require(path.resolve(__dirname, action))(...process.argv.slice(3));
      }
    });
});

program.version(version)
  .parse(process.argv)

program.on('--help', () => {
  console.log('Examples');
  Object.keys(actionsMap).forEach(action => {
    (actionsMap[action].examples || []).forEach(example => {
      console.log(`${example}`);
    })
  })
});

// console.log('welcome');
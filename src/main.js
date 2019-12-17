const program = require('commander');
const path = require('path');

const { version } = require('./utils/constants');

const actionsMap = {
  create: { // 创建模版
    description: 'create project',
    alias: 'cr',
    examples: [
      't-cli create',
    ],
  },
  delete: { // 删除模版
    description: 'delete project',
    alias: 'd',
    examples: [
      't-cli delete',
    ],
  },
  list: { // 所有模版
    description: 'list',
    alias: 'l',
    examples: [
      't-cli list',
    ],
  },
  init: { // 初始化
    description: 't-cli init',
    alias: 'i',
    examples: [
      't-cli init',
      't-cli i',
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
        // require(path.resolve(__dirname, action))(...process.argv.slice(3));
        require(path.resolve(__dirname, action))();
      }
    });
});

program.version(version);

program.usage('<command>');

program.parse(process.argv);

if (program.args.length) {
  // program.help();
}

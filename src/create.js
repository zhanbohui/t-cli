const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const fs = require('fs');
const config = require('../template');

module.exports = () => {
  co(function *() {
    let tplName = yield prompt('Template name: ');
    let gitUrl = yield prompt('Git https link: ');
    let branch = yield prompt('Brach: ');

    if (!config.tpl[tplName]) {
      config.tpl[tplName] = {};
      config.tpl[tplName]['url'] = gitUrl;
      config.tpl[tplName]['branch'] = branch;
    } else {
      console.log(chalk.red('Template has already existed!'));
      process.exit();
    }

    fs.writeFile(__dirname + '/../template.json', JSON.stringify(config), 'utf-8', error => {
      if (error) console.log(error);
      console.log(chalk.green('New template added!\n'));
      console.log(chalk.grey('The last template list is:\n'));
      console.log(config);
      // console.log('\n');
      process.exit();
    });
  });
};

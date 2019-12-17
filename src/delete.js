const config = require('../template');
const Inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');

module.exports = async () => {
  const repos = Object.keys(config.tpl);
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choice repo template to create project',
    choices: repos
  });
  delete config.tpl[repo];
  // 写入配置文件
  fs.writeFile(__dirname + '/../template.json', JSON.stringify(config), 'utf-8', error => {
    if (error) console.log(error);
    console.log(chalk.green(`${repo} delete success!\n`));
    console.log(chalk.grey('The last template list is:\n'));
    console.log(config);
    process.exit();
  });
};

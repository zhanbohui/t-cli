const exec = require('child_process').exec;
const co = require('co');
const config = require('../template');
const chalk = require('chalk');
const Inquirer = require('inquirer');

module.exports = async (projectName) => {
  co(async () => {
    const repos = Object.keys(config.tpl);
    const { repo } = await Inquirer.prompt({
      name: 'repo',
      type: 'list',
      message: 'please choice repo template to create project',
      choices: repos
    });
    // console.log(projectName);
    // let projectName = await prompt('Project name: ');
    const curRepo = config.tpl[repo];
    const gitUrl = curRepo.url;
    const branch = curRepo.branch;
    let cmd = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;

    exec(cmd, (error) => {
      if (error) {
        console.log(error);
        process.exit();
      }
      console.log(chalk.green('\n Generation completed!'));
      console.log(`\n cd ${projectName} && npm install \n`);
      process.exit();
    });
  });
};

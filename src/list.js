const config = require('../template');

module.exports = () => {
  const repos = Object.keys(config.tpl);
  repos.forEach((repo, index) => {
    console.log(`${repo} ${config.tpl[repo].url} ${config.tpl[repo].branch} ${config.tpl[repo].tag}`);
    if (index !== repos.length - 1) {
      console.log('\n');
    }
  });
  process.exit();
};

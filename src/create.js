const axios = require('axios');

const fetchRepoList = async () => {
  const { data } = await axios.get('https://api.github.com/orgs/quick-cli/repos');
  return data;
};

module.exports = async (projectName) => {
  let repos =  await fetchRepoList();
  repos = repos.map(item => item.name);
  console.log(repos);
  console.log(projectName);
};

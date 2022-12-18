const core = require('@actions/core');
const axios = require('axios');
const github = require('@actions/github');

// const { GITHUB_TOKEN } = process.env;
// const octokit = new github.getOctokit(GITHUB_TOKEN);
//
// const owner = core.getInput('owner', { required: true });
// const repo = core.getInput('repo', { required: true });
// const pull_number = core.getInput('pull_number', { required: true });

console.log(github.context);
/*

(async () => {
    const { data: response } = await octokit.pulls.get({
        owner,
        repo,
        pull_number
    });

    console.log(response);
})();*/

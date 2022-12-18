const axios = require('axios');
const github = require('@actions/github');
const getTeamsMessage = require("./getTeamsMessage");


console.log(github.context);

(async () => {
    await axios.post(process.env.TEAMS_WEBHOOK_URL, getTeamsMessage(github.context.payload));
})();

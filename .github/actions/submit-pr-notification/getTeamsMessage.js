function getTeamsMessage(response) {
    return {
        '@context': 'https://schema.org/extensions',
        '@type': 'MessageCard',
        'themeColor': '0072C6',
        'summary': "Pull requests is waiting for code review",
        'sections': [{
            'activityTitle': `${ response.pull_request.title }`,
            'activitySubtitle': `On ${ response.pull_request.base.full_name }`,
            'activityImage': response.pull_request.user.avatar_url,
            'facts': [
                {
                    'name': 'Author',
                    'value': response.pull_request.user.login
                },
                {
                    'name': 'Created',
                    'value': response.pull_request.created_at
                },
                {
                    'name': 'Destination',
                    'value': response.pull_request.base.ref
                },
                {
                    'name': 'Additions',
                    'value': response.pull_request.additions
                },
                {
                    'name': 'Delitions',
                    'value': response.pull_request.deletions
                },
                {
                    'name': 'Changed files',
                    'value': response.pull_request.changed_files
                },
                {
                    'name': 'Link to PullRequest',
                    'value': `[Go to the pull request page](${ response.pull_request._links.html.href })`
                } ],
            'markdown': true
        }]
    }
}

module.exports = getTeamsMessage;

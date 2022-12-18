function getTeamsMessage(response) {
    return {
        '@context': 'https://schema.org/extensions',
        '@type': 'MessageCard',
        'themeColor': '0072C6',
        'summary': "Pull requests is waiting for code review",
        'sections': [{
            'activityTitle': `${ response.title }`,
            'activitySubtitle': `On ${ response.source.repository.name }`,
            'activityImage': response.author.links.avatar.href,
            'facts': [
                {
                    'name': 'Author',
                    'value': response.author.display_name
                },
                {
                    'name': 'Created',
                    'value': response.created_on
                },
                {
                    'name': 'Destination',
                    'value': response.destination.branch.name
                },
                {
                    'name': 'Approves',
                    'value': response.participants
                        .filter(participant => participant.approved)
                        .map(participant => participant.user.display_name)
                        .join(' | ')
                },
                {
                    'name': 'Link to PullRequest',
                    'value': `[Go to the pull request page](${ response.links.html.href })`
                } ],
            'markdown': true
        }]
    }
}

module.exports = getTeamsMessage;

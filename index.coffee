Slack = require 'slack-client'

slackToken = 'xoxb-15488142355-eadzsuSRpuT1620hQ7oK0E9o' # Add a bot at https://my.slack.com/services/new/bot and copy the token here.
autoReconnect = true # Automatically reconnect after an error response from Slack.
autoMark = true # Automatically mark each message as read after it is processed.

slack = new Slack(slackToken, autoReconnect, autoMark)

slack.on 'open', ->
    console.log "Connected to #{slack.team.name} as @#{slack.self.name}"

slack.on 'message', (message) ->
    console.log message

slack.on 'error', (err) ->
    console.error "Error", err

slack.login()
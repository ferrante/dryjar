(function () {
  var Slack = require('slack-client');
  
  var slack = new Slack(sails.config.slack.slackToken, sails.config.slack.autoReconnect, sails.config.slack.autoMark);

  slack.on("message", function (message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user = slack.getUserByID(message.user);
    var text = message.text;
    var username = null;
    if (user.name) {
      username = user.name;
    }
    if (username && username !== sails.config.slack.botName) {
      var validationResult = SlackMessageValidator({
        text: text
      });
      if (validationResult.getScore()) {
        channel.send(validationResult.getResponse());
      }
    }
  });
  module.exports = slack;
}());
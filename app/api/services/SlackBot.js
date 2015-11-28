(function () {
  var Slack = require('slack-client');
  
  var slack = new Slack(sails.config.slack.slackToken, sails.config.slack.autoReconnect, sails.config.slack.autoMark);

  slack.on("message", function (message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var slackUser = slack.getUserByID(message.user);
    var text = message.text;
    var user = null;

    if (!SlackUsers.hasOwnProperty(slackUser.id)) {
      SlackUsers[slackUser.id] = user = SlackUser({
        slackUser: slackUser
      });
    } else {
      user = SlackUsers[slackUser.id];
    }

    if (user && user.getUsername() !== sails.config.slack.botName) {
      var validationResult = SlackMessageValidator({
        text: text
      });

      if (validationResult.getScore()) {
        channel.send(validationResult.getResponse());
        user.addScore(validationResult.getScore());
        channel.send("Your current balance is " + user.getScore() + " PLN");
      }
    }
  });
  module.exports = slack;
}());
(function () {
  var Slack = require('slack-client');
  
  var slack = new Slack(sails.config.slack.slackToken, sails.config.slack.autoReconnect, sails.config.slack.autoMark);

  slack.on("message", function (message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var slackUser = slack.getUserByID(message.user);
    var text = message.text;
    var user = null;

    if (user && user.getUsername() !== sails.config.slack.botName) {
      var validationResult = SlackMessageValidator({
        text: text
      });

      if (validationResult.getScore()) {
        channel.send(validationResult.getResponse());
        ChargeService.charge(slackUser, channel)
        channel.send("Your current balance is " + ChargeService.stats(slackUser, channel) + " PLN");
      }
    }
  });
  module.exports = slack;
}());
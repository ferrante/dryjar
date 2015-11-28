(function () {
  var Slack = require('slack-client');
  
  var slack = new Slack(sails.config.slack.slackToken, sails.config.slack.autoReconnect, sails.config.slack.autoMark);

  slack.on("message", function (message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var slackUser = slack.getUserByID(message.user);
    var text = message.text;
    var user = null;


    if (slackUser.name !== sails.config.slack.botName) {
      var validationResult = SlackMessageValidator({
        text: text
      });

      if (validationResult.getScore()) {
        channel.send(validationResult.getResponse());
        ChargeService.charge(slackUser, channel.name, function () {
          ChargeService.stats(slackUser, channel, function (data) {
            channel.send("Your current balance is " + data.amount + " PLN");
          });
        })
      }
    }
  });
  module.exports = slack;
}());
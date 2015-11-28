(function () {
  var Slack = require('slack-client');
  
  var slack = new Slack(sails.config.slack.slackToken, sails.config.slack.autoReconnect, sails.config.slack.autoMark);

  slack.on("message", function (message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var slackUser = slack.getUserByID(message.user);
    var text = message.text;
    var user = null;

    if (/status/.test(text) && new RegExp(slack.self.id).test(text)) {
      SlackLadder.get(slackUser, channel, function (response) {
        channel.send("Team stats: \n" + response);
      });
      return;
    }

    if (slackUser.name !== sails.config.slack.botName) {
      var validationResult = SlackMessageValidator({
        text: text
      });

      if (validationResult.getScore()) {
        channel.send(validationResult.getResponse());
        ChargeService.charge(slackUser, channel.name, function () {
          ChargeService.userStats(slackUser, channel, function (data) {
            channel.send("<@" + slackUser.name + ">'s balance is " + data.amount + " PLN");

            SlackLadder.get(slackUser, channel, function (response) {
              channel.send("Team stats: \n" + response);
            });
          });
        })
      }
    }
  });
  module.exports = slack;
}());
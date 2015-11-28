(function () {
  var Slack = require('slack-client');
  
  var slack = new Slack(sails.config.slack.slackToken, sails.config.slack.autoReconnect, sails.config.slack.autoMark);

  slack.on("message", function (message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var slackUser = slack.getUserByID(message.user);
    var text = message.text;
    var user = null;

    if (/status/.test(text) && (new RegExp("@" + slack.self.id)).test(text)) {
      var ladder = [];
      for (var id in SlackUsers) {
        if (SlackUsers.hasOwnProperty(id)) {
          console.log(">>>>", SlackUsers[id]);
          ladder.push(SlackUsers[id]);
        }
      }
      ladder.sort(function (a, b) {
        return a.getScore() - b.getScore();
      });
      var ladderText = "";
      var place = 1;
      ladder.forEach(function (user) {
        ladderText += place + ". " + user.getUsername() + "(" + user.getScore() + "PLN)";
      });
      channel.send("Your current balance is " + user.getScore() + " PLN");
      return;
    }

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
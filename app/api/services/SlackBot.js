(function () {
  var Slack = require('slack-client');
  var jsdom = require("jsdom");

  var slack = new Slack(sails.config.slack.slackToken, sails.config.slack.autoReconnect, sails.config.slack.autoMark);

  slack.on("message", function (message) {
    if (!message.user || message.user === slack.self.id) {
      return;
    }

    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var slackUser = slack.getUserByID(message.user);

    var text = message.text;
    var user = null;

    if (new RegExp(slack.self.id).test(text)) {
      if (/status/.test(text)) {
        SlackLadder.get(slackUser, channel, function (response) {
          channel.postMessage({
            attachments: [{
              text: "Team stats: \n" + response,
              color: "#555"
            }]
          });
        });
        return;
      }

      if (/donate/.test(text)) {
        jsdom.env({
          url: "http://siepomaga.pl",
          scripts: ["http://code.jquery.com/jquery.js"],
          done: function (err, window) {
            var $ = window.$;
            var attachments = [];
            $("#awarded_causes li").each(function() {
              var attachment = {};
              var text = "";
              var href = "http://siepomaga.pl" + $(this).find(".red").attr("href") + "/koszyk/dodaj?payment[amount]=20";
              var title = $(this).find("h3 a").text();
              var img = $(this).find("img").attr("src");
              attachment.fallback = title;
              attachment.color = "#bb2";
              attachment.title = title;
              attachment.title_link = href;
              attachment.image_url = img;
              attachment.thumb_url = img;
              attachment.text = "Pomóż";
              attachment.author_icon = "http://familyof3.org/wp-content/uploads/2014/10/donate-icon.png";
              attachments.push(attachment);
            });
            channel.postMessage({
              attachments: attachments
            });
 //           channel.send("Suggested donations: \n" + response);
          }
        });
        return;
      }

      if (/check/.test(text)) {
        var words = text.split(' ');
        var url = words.pop().replace('<', '').replace('>', '');
        jsdom.env({
          url: url,
          scripts: ["http://code.jquery.com/jquery.js"],
          done: function (err, window) {
            var $ = window.$;
            var attachments = [];
            var $payments = $("#payments");
            var success = false;
            var amount = 0;
            var date = '';
            $payments.find("li").each(function() {
              if (success) {
                return;
              }
              var $this = $(this);
              var text = $.trim($this.find(".comment").text());
              var textAmount = $.trim($this.find(".amount").text());
              var textDate = $.trim($this.find(".date").text());
              
              if (new RegExp(slackUser.name).test(text)) {
                success = true;
                amount + parseInt(textAmount);
                date = textDate;
              } else {
                success = false;
              }
            });

            if (success) {
              ChargeService.notifyPayment(slackUser, amount, date, function () {
                channel.send("Zapłaciłeś" + amount + "PLN, brawo");
              });
            } else {
              channel.send("Jeszcze nie odnotowano Twojej płatności");
            }
          }
        });
        return;
      }
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
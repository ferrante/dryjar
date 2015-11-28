module.exports = {
  get: function (slackUser, channel, cb) {
    ChargeService.orgStats(slackUser, channel, function (ladder) {
      var response = "";
      var place = 1;
      ladder.forEach(function (user) {
        response += place + ". <@" + user.user_name + "> (" + user.amount + ") \n";
        place++;
      });
      cb(response);
    });
  }
};
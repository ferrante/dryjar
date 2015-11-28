module.exports = function (options) {
  options = options || {};
  var slackUser = options.slackUser;
  var score = options.score || 0;
  return {
    getScore: function () {
      return score;
    },
    addScore: function (v) {
      score += v;
    },
    getUsername: function () {
      return slackUser.name;
    }
  };
};
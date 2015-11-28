module.exports = function (options) {
  options = options || {};

  var score = 0;
  var text = options.text;

  var invalidWords = ["kurwa", "chuj", "chujowy", "chujowa", "pierdol"];

  invalidWords.forEach(function (word) {
    if ((new RegExp(word)).test(text)) {
      score += 10;
    }
  });

  var getResponse = function () {
    return "Oj, nieładnie! Za ten występek płacisz " + score + "PLN";
  };

  return {
    getScore: function () {
      return score;
    },
    getResponse: getResponse
  };
};
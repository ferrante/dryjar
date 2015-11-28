/**
 * ChargeController
 *
 * @description :: Server-side logic for managing charges
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	charge: function (req, res) {
		var username = req.param("name")
		var organization = req.param("organization")
  		ChargeService.addCharge(username, organization, function(success) {
            res.json(success);
        });
	},

	stats: function(req, res) {
        ChargeService.stats("zdzisiek", "dryjar", function(todos) {
            res.json(todos);
        });
    },	
};


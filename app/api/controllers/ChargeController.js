/**
 * ChargeController
 *
 * @description :: Server-side logic for managing charges
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	charge: function (req, res) {
		console.log(req)
		var username = req.param("name")
  		ChargeService.addCharge(username, function(success) {
            res.json(success);
        });
	}	
};


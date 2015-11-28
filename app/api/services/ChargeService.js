module.exports = {
  charge: function(user, org, cb) {
    Charge.create({user_name: user.name, organization: org, amount: 10}).exec(function(err, todo) {
      if(err) throw err;
      cb(todo);
    });
  },

   stats: function(user, org, cb) {
    Charge.find({ where: {user_name: user.name, organization: org.name}}).sum('amount').exec(function(err, charges) {
      if(err) throw err;
      cb(charges[0]);
    });
  },

};
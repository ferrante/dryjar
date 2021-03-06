module.exports = {
  charge: function(user, org, cb) {
    Charge.create({user_name: user.name, organization: org, amount: 10}).exec(function(err, todo) {
      if(err) throw err;
      cb(todo);
    });
  },

  userStats: function(user, org, cb) {
    Charge.find({ where: {user_name: user.name, organization: org}}).sum('amount').exec(function(err, charges) {
      if(err) throw err;
      cb(charges[0]);
    });
  },

  orgStats: function(user, org, cb) {
    Charge.find().sum('amount').groupBy('user_name').where({'organization': org}).exec(function(err, charges) {
      if(err) throw err;
      if (charges) {
        charges.sort(function (a, b) {
          return b.amount - a.amount;
        });
      }
      cb(charges);
    });
  },

  notifyPayment: function(user, org, amount, payment_date, cb) {
    Charge.find({ where: {user_name: user.name, organization: org.name, payment_date: payment_date}}).exec(function(err, payments){
      if(payments.length == 0){
        Charge.create({user_name: user.name, organization: org, payment_date: payment_date, amount: -1 * amount}).exec(function(err, cb2) {
          if(err) throw err;
            cb(cb2);
          });
      }
    })
  }
};
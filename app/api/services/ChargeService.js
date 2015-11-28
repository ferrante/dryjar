module.exports = {
  addCharge: function(name, org, next) {
    Charge.create({user_name: name, organization: org, amount: 10}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  }
};
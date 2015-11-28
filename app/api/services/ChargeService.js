module.exports = {
  addCharge: function(name, next) {
    Charge.create({user_name: name, amount: 10}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  }
};
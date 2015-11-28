function charge(name, org) {
    return Charge.create({user_name: name, organization: org, amount: 10})
}

function stat(name, org) {
    Charge.find({ where: {user_name: name, organization: org}}).sum('amount')
}
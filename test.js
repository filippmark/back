const User = require('./user.js');

User.find({}, function(err, res){
    console.log(res);
})
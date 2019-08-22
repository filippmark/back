const User = require('./Model/user.js');


User.find({}, function(err, res){
    console.log(res);
})
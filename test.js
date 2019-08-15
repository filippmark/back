const bcrypt = require('bcrypt');

password = "lolkekchebypek";

bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, (err, hash) =>{
        console.log(password);
        console.log(salt);
        console.log(hash);
    });
});
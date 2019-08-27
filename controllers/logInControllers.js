const passport = require('passport');
const jwt = require('jsonwebtoken');

const logIn = function(req, res, next){
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(user);
        console.log(info);
        if (err) {
             return next(err); 
        } else{
            if (!user) { 
                return res.status(200).send(info); 
            } else{
                req.logIn(user, {session: false}, function(err) {
                    if (err) { 
                        return next(err); 
                    }
                    const token = jwt.sign({user}, process.env.SECURE_KEY);
                    console.log(process.env.SECURE_KEY);
                    return res.send({user, token});
                });
            }
        }
      })(req, res, next);
    
    
};

exports.logIn = logIn;
 
const passport = require("passport");

module.exports = function(req, res, next) {
  passport.authenticate("jwt", { session: false }, function(err, user) {
    console.log("---------");
    console.log(err);
    console.log(user);
    if(user){
        req.user = user;
        next();
    }else{
        res.status(500).send({message: "Авторизуйтесь, пожалуйста, для продолжения"});
    }
  })(req, res, next);
};

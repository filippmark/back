const passport = require('passport');

const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const LocalStrategy = require('passport-local').Strategy;


const User = require("./model/user");

passport.use(new LocalStrategy({
        usernameField: 'email',
        password: 'password'
    },
    function(email, password, done) {
      User.findOne({ email}, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        user.validPassword(password, function (err, resp)  {
          if (!resp)
            done(null, false, { message: 'Incorrect username.' });
          done(null, user);  
        });
        
      });
    }
));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.SECURE_KEY
},
function (jwtPayload, cb) {
  console.log(jwtPayload);
  return User.findOneById(jwtPayload.id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
  }
));
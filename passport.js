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
          return done(null, false, { message: 'Неверный email!' });
        }
        user.validPassword(password, function (err, resp)  {
          if (!resp)
            return done(null, false, { message: 'Неверный пароль!' });
          done(null, user);  
        });
        
      });
    }
));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.SECURE_KEY
},
async function (jwtPayload, cb) {
  try{
    console.log(jwtPayload);
    console.log(jwtPayload.user._id);
    let user = await User.findById(jwtPayload.user._id); 
    console.log(user);
    cb(null, user);
  }catch(err){
    cb(err);
  }
}));
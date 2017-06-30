const passport 			= require('passport'),
 			User 					= require('../models/user'),
 			config 				= require('../config'),
 			JwtStrategy 	= require('passport-jwt').Strategy,
 			ExtractJwt 		= require('passport-jwt').ExtractJwt,
 			LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) { 
    	return done(err); 
    }
    if (!user) { 
    	return done(null, false); 
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) { 
      	return done(err); 
      }
      if (!isMatch) { 
      	return done(null, false); 
      }
      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { 
    	return done(err, false); 
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

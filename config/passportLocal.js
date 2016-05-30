var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SHA256        = require("crypto-js/sha256");
var User          = require('../models/user');


//Set up local strategy ==================================

passport.use(new LocalStrategy(function(fbid, hash, done) {
  User.findOne({"facebook.id": fbid}, function(err, user){
    if(err){
      console.log('Passport message: "Error/failed, incorrect username, cant be found"');
      return done(null, false, {message: "Error/failed, incorrect username, can't be found"});
    }
    if (!user) {
      console.log('Passport message: "failed,  correct DB query, cant find user"');
      return done(null, false, {message: "failed, correct DB query, can't find user"});
    }
    if (!user.validHash(hash)) {
      console.log('Passport message: "failed,  Incorrect hash"');
      return done(null, false, {message: 'Incorrect hash'});
    }
    return done(null, user);
  });
}));

passport.serializeUser(function(user , done) {
    done(null, SHA256(user._profile.id, process.env.VC_SECRET_CRYPTO || 'secret'));
});

passport.deserializeUser(function(id, done) {
    SHA256.decrypt(id, process.env.VC_SECRET_CRYPTO || 'secret');
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

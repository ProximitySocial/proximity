const User = require('../models/user');
const passport         = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const BearerStrategy   = require('passport-http-bearer');


passport.use(new BearerStrategy(
  (token, done) => {
    User.findOne({access_token: token}, (err, user) => {
      if (err) return done(err)
        if (!user) {
            return done(null, false)
        }
        return done(null, user, {scope: 'all'})
    })
  }
))

passport.use('facebook', new FacebookStrategy({
    clientID: process.env.PROXIMITY_FB_ID,
    clientSecret: process.env.PROXIMITY_FB_SECRET,
    callbackURL: 'https://proximitysocial.herokuapp.com/api/auth/facebook/callback'
    // callbackURL: 'https://vivacityapp.herokuapp.com/api/auth/facebook/callback'
    // callbackURL: 'http://localhost:2323/api/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
        console.log('OAUTH CALLBACK RETURNED PROFILE')
        // console.log(profile)
        //check user table for anyone with a facebook ID of profile.id
        User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                var names = profile.displayName.split(' ')
                var first = names[0]
                var last = names[1]
                user = new User({
                    firstName: first,
                    lastName: last,
                    provider: 'facebook',
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    facebook: profile._json
                });
                user.setHash(profile._json.id)
                user.access_token = accessToken
                user.save(function(err) {
                    if (err) console.log(err);
                    console.log('CREATED USER from Facebook strategy')
                    console.log(user)
                    return done(err, user);
                });
            } else {
                // if(!user.access_token){
                //   user.access_token = accessToken
                //   user.save()
                // }
                //found user. Return
                console.log('FOUND USER from Facebook strategy')
                console.log(user)
                return done(err, user);
            }
        });
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = exports = passport

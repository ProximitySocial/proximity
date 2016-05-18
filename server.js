const mongoose         = require('mongoose')
    , path             = require('path')
    , express          = require('express')
    , app              = express()
    , bodyParser       = require('body-parser')
    , methodOverride   = require('method-override')
    , userRouter       = require(__dirname + '/routes/user_routes')
    , eventRouter      = require(__dirname + '/routes/event_routes')
    , authRouter       = require(__dirname + '/routes/auth_routes')

var   passport         = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
// var jwt            = require('express-jwt');
const User = require(__dirname + '/models/user')
//// configuration ===========================================
console.log(process.env.NODE_ENV + ' :::: Environment');

// // config files
var db = require('./config/db');
console.log('DB: ' + db.url);

// set our port
var port = process.env.PORT || 2323;

var localhost = 'http://localhost:' + port
// connect to mongoDB database
mongoose.connect(db.url);

passport.use('facebook', new FacebookStrategy({
  // authorizationURL: 'https://graph.facebook.com/oauth/authorize', // facebook authURL
  // tokenURL: 'https://graph.facebook.com/oauth/access_token/',  // from facebook
  clientID: process.env.PROXIMITY_FB_ID,
  clientSecret: process.env.PROXIMITY_FB_SECRET,
  callbackURL: 'http://localhost:2323/api/auth/facebook/callback/'
},

function(accessToken, refreshToken, profile, done) {
        console.log('OAUTH CALLBACK RETURNED PROFILE')
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)
        //check user table for anyone with a facebook ID of profile.id
        User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                user = new User({
                    firstName: profile.displayName,
                    email: profile.email,
                    provider: 'facebook'
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    // facebook: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    console.log('CREATED USER')
                    console.log(user)
                    return done(err, user);
                });
            } else {
                //found user. Return
                console.log('FOUND USER')
                console.log(user)
                return done(err, user);
            }
        });
    }



  // function(accessToken, refreshToken, profile, done) {
  //   User.findOrCreate({...}, function(err, user) {
  //     if (err) return console.log('Could not find or create user')
  //     console.log(user)
  //     done(err, user)
  //   })
  // }
))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// // SET VIEW ENGINE.....could be JADE
// app.set('view engine', 'html');
// // get all data/stuff of the body (POST) parameters
// // // parse application/json
app.use(express.static(__dirname + '/build'));

app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'secret',
//   resave: false,
//   saveUninitialized: false,
//   maxAge: 60000
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', eventRouter)

app.on('listening', () => {
  console.log('ok, server is running')
})

app.listen(port)

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;

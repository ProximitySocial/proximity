const mongoose       = require('mongoose')
    , path           = require('path')
    , express        = require('express')
    , app            = express()
    , bodyParser     = require('body-parser')
    , methodOverride = require('method-override')
    , userRouter     = require(__dirname + '/routes/user_routes')
    , eventRouter    = require(__dirname + '/routes/event_routes')
    , authRouter    = require(__dirname + '/routes/auth_routes')

var passport         = require('passport')
    , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
// var jwt            = require('express-jwt');


//// configuration ===========================================
console.log(process.env.NODE_ENV + ' :::: Environment');

// // config files
var db = require('./config/db');
console.log('DB: ' + db.url);

// set our port
var port = process.env.PORT || 5447;

// connect to mongoDB database
mongoose.connect(db.url);

// passport.use('facebook', new OAuth2Strategy({
//   authorizationURL: 'https://graph.facebook.com/oauth/authorize', // facebook authURL
//   tokenURL: 'https://graph.facebook.com/oauth/access_token',  // from facebook
//   clientID: process.env.PROXIMITY_FB_ID,
//   clientSecret: process.env.PROXIMITY_FB_SECRET,
//   callbackURL: 'where to redirect after auth'
// },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate(..., function(err, user) {
//       done(err, user)
//     })
//   }
// ))



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '/*/');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// // SET VIEW ENGINE.....could be JADE
// app.set('view engine', 'html');
// // get all data/stuff of the body (POST) parameters
// // // parse application/json

app.use(express.static(__dirname + '/public'));
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
// app.use(express.static(__dirname + '/build'));
app.on('listening', function(){
  console.log('ok, server is running')
})

// app.get('/', function(req, res) {
//   res.sendfile('./public')
// })

app.listen(port)

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;

const mongoose       = require('mongoose')
    , path           = require('path')
    , express        = require('express')
    , app            = express()
    , bodyParser     = require('body-parser')
    , methodOverride = require('method-override')
    , userRouter     = require(__dirname + '/routes/user_routes')
    , eventRouter    = require(__dirname + '/routes/event_routes')
    , authRouter    = require(__dirname + '/routes/auth_routes')

const User           = require(__dirname + '/models/user')
var passport         = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;


    // , OAuthStrategy  = require('passport-oauth').OAuthStrategy
    // , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
// var jwt            = require('express-jwt');

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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// // SET VIEW ENGINE.....could be JADE
// app.set('view engine', 'html');

app.use(express.static(__dirname + '/build'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', eventRouter)

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/build').status(200)
})

app.get('/login', (req, res) => {
  res.status(200).json(req)
})

app.on('listening', () => {
  console.log('ok, server is running')
})

app.listen(port)

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
// module.exports = exports = app = (port2, cb) => {
//   return app.listen(port || port2,
//     cb || (() => console.log('Magic happens on port: ' + port)));
// };

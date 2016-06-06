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
const passport       = require('passport')
const jwt            = require('express-jwt');
const auth = jwt({secret: process.env.VC_SECRET_CRYPTO || 'secret', userProperty: 'payload'});

//// configuration ===========================================
console.log(process.env.NODE_ENV + ' :::: Environment');

// // config files
var db = require('./config/db');
console.log('DB: ' + db.url);

// set our port
if (process.env.NODE_ENV === 'test'){
  var port = 4343
} else {
  var port = process.env.PORT || 2323;
}

// connect to mongoDB database
mongoose.connect(db.url);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://proximitysocial.herokuapp.com');
  // res.header('Access-Control-Allow-Origin', 'http://localhost:2323');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Authorization, Origin, X-Requested-With, Content-Type, Accept');
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
  // if (req.query.access_token){
  //   console.log('Access TOKEN found')
  //   res.sendfile(__dirname + '/build').status(200)
  // }
  // console.log('no access TOKEN')
  console.log('REDIRECTED AND AUTHENTICATED');
  console.log(req.query.access_token);
  res.render(__dirname + '/build.index.html');
})

// function ensureAuthenticated(req, res, next) {
//   console.log('INSIDE ENSURE AUTHENTICATED');
//   console.log(req);
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/');
// }


app.get('/login', (req, res) => {
  console.log('login route')
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

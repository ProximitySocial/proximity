const express = require('express')
const passport = require('../config/passport')
// const jsonParser = require('body-parser').json()
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const authRouter = module.exports = exports = express.Router()
const SHA256   = require("crypto-js/sha256");

authRouter.post('/mobile/facebook/shake', (req, res) => {
  console.log('From the top of the handshake')
  console.log(req.headers)
  console.log(req.body)
  console.log('headers ahead of this line')

  authorization = req.headers.authorization
  console.log(typeof authorization)
  console.log('##########################')
  // SHA256.decrypt(authorization, process.env.VC_SECRET_CRYPTO || 'secret'));
  fbid = SHA256.decrypt(authorization, process.env.VC_SECRET_CRYPTO || 'secret');
  // fbid = passport.deserialize(authorization)
  console.log(fbid)
  new User(req.body).save((err, success) => {
    if(err) return res.status(500).json({msg: 'could not save user properly', error: err})
    console.log('success from /mobile/facebook/shake route inside authRouter')
    console.log(success)
  })


})

authRouter.get('/auth/facebook', passport.authenticate('facebook',
                                                       {session: false, scope: 'email'}))
authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false,
                                      failureRedirect: '/login' }),
  (req, res) => {

    console.log('TRIED TO REDIRECT TO ROOT with access Token')
    console.log(req.isAuthenticated());

    // res.status(200).json(req.user);
    // res.header('Access-Control-Allow-Origin', 'http://localhost:2323');
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify(req.user));
    res.redirect("/?access_token=" + req.user.access_token);
    // res.redirect('/dashboard?access_token=' + req.user.access_token);
  }
)
 // return JWT = JWT???

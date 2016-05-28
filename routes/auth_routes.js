const express = require('express')
const passport = require('../config/passport')
// const jsonParser = require('body-parser').json()
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const authRouter = module.exports = exports = express.Router()

authRouter.get('/api/mobile/facebook/shake', (req, res) => {
  console.log(req.headers)
  console.log('headers ahead of this line')
  authorization = req.headers.authorization
  fbid = passort.deserialize(authorization)
  console.log(fbid)


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
  return JWT = JWT???

const express = require('express')
const passport = require('../config/passport')
// const jsonParser = require('body-parser').json()
const User = require('./../models/user')
const Event = require(__dirname + '/../models/event')
const authRouter = module.exports = exports = express.Router()
const CryptoJS   = require("crypto-js");

authRouter.post('/mobile/facebook/shake', (req, res) => {
  console.log('From the top of the handshake')
  userData = req.body
  var token = req.headers.authorization
  // console.log('token: '+ token)
  // var decrypted = CryptoJS.AES.decrypt(token.toString(), 'secret')  // var fbid = decrypted.toString(CryptoJS.enc.Utf8);
  var bytes = CryptoJS.AES.decrypt(token, process.env.VC_SECRET_CRYPTO)
  // console.log(bytes)
  var fbid = bytes.toString(CryptoJS.enc.Utf8);

  User.find({"facebook.id": fbid.slice(1, -1)}, (err, array) => {
      if (err) return res.status(500).json({msg: 'Error, with findOne', error: err})
      console.log(array.length)
      if (array.length === 0) {
          console.log('no user found, (!user)')
          user = new User(userData)
          user.setHash(fbid)
          user.save(function(err, result) {
              if (err) console.log(err);
              console.log('CREATED USER')
              // console.log(result)
              var jwtoken = user.generateJWT()
              res.status(200).json({msg: 'Created User', jwt: jwtoken})
          });
      } else {
        console.log('FOUND USER')
        console.log(array)
        var jwtoken = array[0].generateJWT()
        res.status(200).json({msg: 'Found User', jwt: jwtoken})
      }
  });


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

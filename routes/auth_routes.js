const express = require('express')
const passport = require('../config/passport')
// const jsonParser = require('body-parser').json()
const User = require('./../models/user')
const Event = require(__dirname + '/../models/event')
const authRouter = module.exports = exports = express.Router()
const CryptoJS   = require("crypto-js");

authRouter.post('/mobile/facebook/shake', (req, res) => {
  console.log('From the top of the handshake')
  if(req.headers.authorization){
    userData = req.body
    console.log(userData)
    console.log('FOR TESTING &^^^^^^^^^^^^^^^^^')
    var token = req.headers.authorization
    var bytes = CryptoJS.AES.decrypt(token, process.env.VC_SECRET_CRYPTO)
    var fbid = bytes.toString(CryptoJS.enc.Utf8)

    User.findOne({"facebook.id": fbid.slice(1, -1)}, (err, user) => {
        if (err) return res.status(500).json({msg: 'Error, with findOne', error: err})
        if (!user) {
            console.log('no user found, (!user)')
            user = new User(userData)
            user.setHash(fbid)
            user.save((err, result) => {
                if (err) console.log(err);
                console.log('CREATED USER')
                console.log(result)
                var jwtoken = user.generateJWT()
                res.status(200).json({msg: 'Created User', jwt: jwtoken})
            });
        } else {
          console.log('FOUND USER')
          console.log(user)
          var jwtoken = user.generateJWT()
          res.status(200).json({msg: 'Found User', jwt: jwtoken})
        }
    });
  }
})

authRouter.get('/auth/facebook', passport.authenticate('facebook',
                                                       {session: false, scope: 'email'}))
authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false,
                                      failureRedirect: '/login' }),
  (req, res) => {
    res.redirect("/?access_token=" + req.user.access_token);
  }
)
 // return JWT = JWT???

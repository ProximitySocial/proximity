const express = require('express')
const passport = require('passport')
// const jsonParser = require('body-parser').json()
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const authRouter = module.exports = exports = express.Router()

authRouter.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}, (req, res) => {
  console.log('inside auth/facebook');
  console.log(req.user);
}))

authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/'}),
  (req, res) => {
    console.log('inside auth/facebook/callback');
    console.log(req);
    console.log('redirecting to home');
    res.redirect('/')
})

authRouter.get('/auth/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

const express = require('express')
const passport = require('passport')
// const jsonParser = require('body-parser').json()
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const authRouter = module.exports = exports = express.Router()

authRouter.get('/auth/facebook', passport.authenticate('facebook'))

authRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}))

const express = require('express')
// const jsonParser = require('body-parser').json()
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const userRouter = module.exports = exports = express.Router()

userRouter.get('/users', (req, res) => {
  User.find({}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json(result)
  })
})

userRouter.post('/user/new', (req, res) => {
  var userData = req.body
  User.find({email: req.body.email}, (err, data) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    if (data.length) {
      console.log('no data found')
      res.status(400).json({msg: 'User already exists'})
    } else {
      new User(userData).save((err, result) => {
        console.log(result)
        res.status(200).json({msg: 'user created'})
      })
    }
  })
})

userRouter.get('/user/:id', (req, res) => {
  User.findOne({_id: req.params.id}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json({msg: 'Retrieved individual user'})
  })
})


userRouter.put('/user/:id', (req, res) => {
  var newData = req.body
  delete newData._id
  User.update({_id: req.params.id}, newData, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json({msg: 'Successfully updated User'})
  })
})

userRouter.delete('/user/:id', (req, res) => {
  User.remove({_id: req.params.id}, (err) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json({msg: 'Successfully destroyed User'})
  })
})

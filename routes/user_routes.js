const express = require('express')
// const jsonParser = require('body-parser').json()
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const userRouter = module.exports = exports = express.Router()
const getS3SignedUrl = require('../config/aws')
const createUser = require('../libs/userLib')

userRouter.get('/users', (req, res) => {
  User.find({}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json(result)
  })
})


userRouter.post('/user/new', (req, res) => {
  console.log('NEW POST for a user')
  var userData = req.body
  if(userData.fileName && userData.fileType){
    getS3SignedUrl(userData)
      .then((data) => {
        createUser(data, res)
      }).catch((err) => {
        throw err;
      })
  } else {
    createUser(userData, res)
  }
})

userRouter.get('/user/:id', (req, res) => {
  console.log("GETTING REQUEST for a specific user")
  User.findOne({_id: req.params.id}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    if (result === null) return res.status(400).json({msg: "bad request, user doesn't exist"})
    res.status(200).json(result)
  })
})


userRouter.put('/user/:id', (req, res) => {
  console.log('SERVER UPDATE USER ROUTE')
  var newData = req.body
  User.update({_id: req.params.id}, {$set: newData}, (err, doc) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    console.log(doc)

    res.status(200).json({docs: doc, msg: 'changed User details' })
  })
})

userRouter.delete('/user/:id', (req, res) => {
  User.remove({_id: req.params.id}, (err) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json({msg: 'Successfully destroyed User'})
  })
})

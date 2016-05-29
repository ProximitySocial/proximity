const express = require('express')
// const jsonParser = require('body-parser').json()
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const updateUser = require('../libs/userLib').createUser
const userRouter = module.exports = exports = express.Router()
const getS3SignedUrl = require('../config/aws')
// const createUser = require('../libs/userLib')
const passport = require('../config/passport')

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
        updateUser(data, res)
      }).catch((err) => {
        throw err;
      })
  } else {
    updateUser(userData, res)
  }
})

userRouter.get('/user', passport.authenticate('bearer', {session: false}),
  (req, res) => {
    console.log("GETTING REQUEST for a specific user")
    res.status(200).json(req.user).header()
  }
)


userRouter.get('/user/:id', (req, res) => {
  console.log("GETTING REQUEST for a specific user")
  User.findOne({access_token: req.params.id}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    if (result === null) return res.status(400).json({msg: "bad request, user doesn't exist"})
    res.status(200).json(result)
  })
})


userRouter.put('/user/:id', (req, res) => {
  console.log('SERVER UPDATE USER called');
  var cb = function() {};
  var newData = req.body
  Object.keys(newData).forEach( (prop) => {
    if (!newData[prop]){
      console.log('deleting prop obj: ' + newData[prop])
      delete newData[prop]
    }
  })
  if (newData.address) {
    var address = req.body.address.split(' ').join('+')
    callGoogle(address)
      .then((data) => {
        newData.neighborhood = data.results[0].address_components[2].long_name
        newData.locationData = data
          if (newData.fileName && newData.fileType){
            console.log('picture changed && address changed')
            getS3SignedUrl(newData, cb)
              .then((data) => {
                newData = data
                return updateUser(newData, req.params.id, res)
              }).catch((err) => { console.log('inside call google error'); throw err; })
          } else {
            console.log('no S3 change but Yes an address changed')
            return updateUser(newData, req.params.id, res)
          }
      }).catch((err) => { console.log('inside call google error'); throw err; })
  }
  if (newData.fileName && newData.fileType){
    console.log('picture changed, no address change')
    console.log(newData);
    getS3SignedUrl(newData, cb)
      .then((data) => {
        newData = data
        console.log(newData);
        return updateUser(newData, req.params.id, res)
      }).catch((err) => { console.log('inside call S3 error'); throw err; })
  } else {
    console.log('no address change and no picture change')
    return updateUser(newData, req.params.id, res)
  }
})



// userRouter.put('/user/:id', (req, res) => {
//   console.log('SERVER UPDATE USER ROUTE')
//   var newData = req.body
//   User.update({_id: req.params.id}, {$set: newData}, (err, doc) => {
//     if (err) return res.status(500).json({msg: 'Server Error'})
//     console.log(doc)
//     res.status(200).json({docs: doc, msg: 'changed User details' })
//   })
// })

userRouter.delete('/user/:id', (req, res) => {
  User.remove({_id: req.params.id}, (err) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json({msg: 'Successfully destroyed User'})
  })
})

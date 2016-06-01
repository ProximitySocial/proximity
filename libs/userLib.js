const User = require('../models/user')

function createUser(userData, res){
  userData.pic = userData.url
  User.find({email: userData.email}, (err, data) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    if (data.length) {
      res.status(400).json({msg: 'User already exists, or bad request'})
    } else {
      new User(userData).save((err, result) => {
        if(err) {return res.status(500).json({error: err})}
        res.status(200).json({msg: 'user created', id: result._id, signedRequest: userData.awsData, url: userData.url})
      })
    }
  })
}

module.exports = exports = {createUser}

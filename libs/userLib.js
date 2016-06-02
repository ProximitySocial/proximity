const User = require('../models/user')

function createUser(userData, res){
  console.log('Attempting to create a user with this userData: ');
  console.log(userData);
  userData.pic = userData.url
  User.find({facebook.id: facebook.id}, (err, data) => {
    console.log('Result of user search: ');
    console.log(data);
    if (err) return res.status(500).json({msg: 'Server Error'})
    if (data.length) {
      res.status(400).json({msg: 'User already exists, or bad request', data: data})
    } else {
      new User(userData).save((err, result) => {
        if(err) {return res.status(500).json({error: err})}
        console.log('User _id: ' + result._id)
        res.status(200).json({msg: 'user created', id: result._id, signedRequest: userData.awsData, url: userData.url})
      })
    }
  })
}

function updateUser(newData, ID, res){
  console.log("updating User with variables :")
  console.log(newData);
  newData.pic = newData.url;
  User.update({_id: ID}, {$set: newData}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    console.log(result);
    res.status(200).json({msg: 'Successfully updated user', result: result, signedRequest: newData.awsData})
  })
}

module.exports = exports = {updateUser, createUser}

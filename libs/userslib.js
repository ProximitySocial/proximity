const User = require(__dirname + '/../models/user')

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


module.exports = exports = {updateUser}

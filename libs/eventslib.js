const Event = require(__dirname + '/../models/event')

function updateEvent(newData, ID, res){
  console.log("updating Event with variables :")
  console.log(newData);
  newData.picture = newData.url;
  Event.update({_id: ID}, {$set: newData}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    console.log(result);
    Event.find({_id: ID}, (err, result) => {
      console.log('updated result');
      console.log(result);
    })
    res.status(200).json({msg: 'Successfully updated event', result: result, signedRequest: newData.awsData})
  })
}


module.exports = exports = {updateEvent}

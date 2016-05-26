const Event = require(__dirname + '/../models/event')

function updateEvent(newData, ID, res){
  console.log("updating Event with variables :")
  Event.update({_id: ID}, {$set: newData}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json({msg: 'Successfully updated event', result: result})
  })
}


module.exports = exports = {updateEvent}

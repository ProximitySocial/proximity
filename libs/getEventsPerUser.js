//Callbacks to get events per user's neighborhood
const User = require('../models/user')
const Event = require('../models/event')

//get users neighborHood, then call perHoodGetEvents
function getAndSendUserLocalEvents(userId, res) {
    var dbQuery = userId.length > 30 ? {access_token: userId} : {_id: userId}
    console.log(dbQuery)
    User.findOne(dbQuery, 'neighborhoods interests', (err, data) => {
      if (err) return res.status(500).json({msg: 'Server Error'})
      else if (data === null) res.status(400).json({msg: 'Bad request...user Id likely invalid'})
      else {getEventsPerHood(null, data, res)}
    })
}

// query DB for the get
function getEventsPerHood(error, data, res){
    if (error) return console.error('Uhoh, there was an error', err)
    Event.find({neighborhood: { $in: data.neighborhoods},
      interestTags: { $in: data.interests}}, function(err, results){
      if (err) {return res.status(500).json({msg: 'Server Error'})}
      else { return results }
    })
    .sort({startTime: 'desc'})
    .exec(function(err, docs){
      if (err) {return res.status(500).json({msg: 'Server Error'})}
      else { sendUserEvents(null, docs, res) }
    })
}

function sendUserEvents(error, data, res){
  if (error) {return res.status(500).json({msg: 'Server Error'})}
  res.status(200).json({msg: 'Here is the events located in your Hood and ordered per time',
                        events: data})
}


module.exports = getAndSendUserLocalEvents


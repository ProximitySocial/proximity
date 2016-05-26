//Callbacks to get events per user's neighborhood
const User = require(__dirname + '/../../models/user')
const Event = require(__dirname + '/../../models/event')

//get users neighborHood, then call perHoodGetEvents
function getAndSendUserLocalEvents(userId, res) {
    console.log('GET AND SEND USER LOCAL EVENTS');
    console.log(userId);
    User.findOne({_id: userId}, 'neighborhoods interests', (err, data) => {
      if (err) {return res.status(500).json({msg: 'Server Error'})}
      else if (data === null) res.status(400).json({msg: 'Bad request...user Id likely invalid'})
      else {getEventsPerHood(null, data, res)}
    })
}

// query DB for the get
function getEventsPerHood(error, data, res){
    if (error) return console.error('Uhoh, there was an error', err)
    console.log('GETTING EVENTS PER HOOD')
    console.log(data);
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

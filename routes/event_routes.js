const express = require('express')
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const eventRouter = module.exports = exports = express.Router()
const updateEvent = require('../libs/eventLib').updateEvent
const http = require('http')
const callGoogle = require('../libs/googleLocation')
const getAndSendUserLocalEvents = require('../libs/getEventsPerUser')
const getS3SignedUrl = require('../config/aws')
const passport = require('../config/passport')



//index of events
eventRouter.get('/events', (req, res) => {
  console.log('request for ALL events')
  // console.log(req)
  Event.find({}, (err, result) => {
    if (err || result === null) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json(result)
  })
})

//Get events, sorted by time per user specified neighborhoods
eventRouter.get('/events/:userID', (req, res) => {
  console.log('Events per userID has been requested')
  var userID = req.params.userID
  getAndSendUserLocalEvents(userID, res)
})

  //create new event
eventRouter.post('/event/new', (req, res) => {
  console.log("Made a POST request for NEW event")
  console.log(req.body);
  //add _creator from User _id
  var cb = function() {};
  var eventData = req.body
  var address = req.body.address.split(' ').join('+')
  callGoogle(address)
    .then((data) => {
      if(eventData.fileName && eventData.fileType){
        getS3SignedUrl(eventData, cb)
          .then((s3Data) => { eventData = s3Data }).catch((err) => {throw err;})
      }
      eventData.neighborhood = data.results[0].address_components[2].long_name
      eventData.locationData = data
      eventData.picture = eventData.url
      eventData._creator = req.body.userID
      console.log('Event data before mongoose:');
      console.log(eventData);
      new Event(eventData).save((err, result) => {
        if (err || result === null) return res.status(500).json({msg: 'Server Error'})
        console.log('after mongoose query');
        console.log(result);
        res.status(200).json({msg: 'event created', eventID: result._id, signedRequest: eventData.awsData})
      })
    })
    .catch((err) => {
      throw err;
    })
})

//get specific event
eventRouter.get('/event/:id', (req, res) => {
  Event.findOne({_id: req.params.id}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    else if (result === null) res.status(400).json({msg: 'Bad request...event Id likely invalid'})
    res.status(200).json(result)
  })
})

//get the attendees of a specific event
eventRouter.get('/event/attendees/:id', (req, res) => {

  console.log('GETTING EVENT ATTENDEES');

  Event.findOne({_id: req.params.id}, {_attendees: true}).exec()
    .then((result) => {
      console.log('found event attendees');
      console.log(result);
      const attendeePromises = result._attendees.map((attendeeId) => {
        console.log(attendeeId);
        const attendeeProm = User.findOne({_id: attendeeId}).exec()
          .catch((err) => {res.status(500).json({msg: 'Error retrieving user'})})
        return Promise.resolve(attendeeProm)
      })
      return Promise.all(attendeePromises);
    })
    .then((final) => {
      console.log(final);
      res.status(200).json(final);
    })
    .catch((err) => {
      res.status(500).json({msg: 'Error retrieving event'});
    })
})


//update event  AUTH creator
eventRouter.put('/event/:id', (req, res) => {
  if(req.headers.authorization){
    console.log(req.headers.authorization)
  }
  console.log('SERVER UPDATE EVENT called');
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
                return updateEvent(newData, req.params.id, res)
              }).catch((err) => { console.log('inside call google error'); throw err; })
          } else {
            console.log('no S3 change but Yes an address changed')
            return updateEvent(newData, req.params.id, res)
          }
      }).catch((err) => { console.log('inside call google error'); throw err; })
  }
  if (newData.fileName && newData.fileType && !newData.address){
    console.log('picture changed, no address change')
    console.log(newData);
    getS3SignedUrl(newData, cb)
      .then((data) => {
        newData = data
        return updateEvent(newData, req.params.id, res)
      }).catch((err) => { console.log('inside call S3 error'); throw err; })
  }
  if (!newData.address && !newData.fileName && !newData.fileType){
    console.log('no address change and no picture change')
    console.log(res);
    return updateEvent(newData, req.params.id, res)
  }
})

//add attendee
//body must contain {"userID": "494934930300030303"}, so that Event $addToSet will add user to _attendees array
// eventually need to check that :id matches auth req.user._id
eventRouter.put('/event/:id/join', (req, res) => {
  var userID = req.body.userID
  console.log('Attempting to join event');
  console.log(req.body.userID);
  Event.update({_id: req.params.id}, {$addToSet: {_attendees: userID}}, (err, result) => {
      if (err) return res.status(500).json({msg: 'Server Error'})
      console.log(result)
      res.status(200).json({msg: 'Successfully added attendee to Event'})
  })
})

//remove attendee
eventRouter.put('/event/:id/leave', (req, res) => {
  var userID = req.body.userID
  console.log('Attempting to leave event');
  console.log(req.body.userID);
  Event.update({_id: req.params.id}, {$pull: { _attendees: userID}}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json({msg: 'Successfully removed attendee from Event'})
  })
})

//destroy Event
eventRouter.delete('/event/:id', (req, res) => {
  Event.remove({_id: req.params.id}, (err) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json({msg: 'Successfully destroyed event'})
  })
})

const express = require('express')
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const eventRouter = module.exports = exports = express.Router()
const http = require('http')
const callGoogle = require('../public/libs/googleLocation')
const getAndSendUserLocalEvents = require('../public/libs/getEventsPerUser')


//index of events
eventRouter.get('/events', (req, res) => {
  console.log('request for ALL events')
  Event.find({}, (err, result) => {
    if (err || results === null) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json(result)
  })
})

//Get events, sorted by time per user specified neighborhoods
eventRouter.get('/events/:userId', (req, res) => {
  console.log('Events per USER has been requested')
  var userId = req.params.userId
  getAndSendUserLocalEvents(userId, res)
})

  //create new event
eventRouter.post('/event/new', (req, res) => {
  //add _creator from User _id
  var eventData = req.body
  console.log("Made a POST request for NEW user")
  var address = req.body.address.split(' ').join('+')
  callGoogle(address)
    .then((data) => {
      eventData.neighborhood = data.results[0].address_components[2].long_name
      eventData.locationData = data
      console.log(eventData)
      new Event(eventData).save((err, result) => {
        if (err || results === null) return res.status(500).json({msg: 'Server Error'})
        res.status(200).json({msg: 'event created', data: result})
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

//update event  AUTH creator
eventRouter.put('/event/:id', (req, res) => {
  console.log('SERVER UPDATE EVENT ROUTE');
  //auth for creator
  var newData = req.body
  // delete newData._creator
  // delete newData._id
  var address = req.body.address.split(' ').join('+')
  console.log(address);
  callGoogle(address)
    .then((data) => {
      newData.neighborhood = data.results[0].address_components[2].long_name
      newData.locationData = data
      Event.update({_id: req.params.id}, newData, (err, result) => {
        if (err) return res.status(500).json({msg: 'Server Error'})
        res.status(200).json({msg: 'Successfully updated event'})
      })
    })
    .catch((err) => {
      console.log('inside call google error');
      throw err;
    })
})

//add attendee
//body must contain {"userId": "494934930300030303"}, so that Event $addToSet will add user to _attendees array
eventRouter.put('/event/:id/join', (req, res) => {
  var userId = req.body.userId
  Event.update({_id: req.params.id}, {$addToSet: {_attendees: userId}}, (err, result) => {
      if (err) return res.status(500).json({msg: 'Server Error'})
      console.log(result)
      res.status(200).json({msg: 'Successfully added attendee to Event'})
  })
})

//remove attendee
eventRouter.put('/event/:id/leave', (req, res) => {
  var userId = req.body.userId
  Event.update({_id: req.params.id}, {$pull: { _attendees: userId}}, (err, result) => {
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

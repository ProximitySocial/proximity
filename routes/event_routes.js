const express = require('express')
// const jsonParser = require('body-parser').json()
const User = require(__dirname + '/../models/user')
const Event = require(__dirname + '/../models/event')
const eventRouter = module.exports = exports = express.Router()
const http = require('http')
const callGoogle = require('../public/libs/googleLocation')

// const Promise = require('promise');
// const requestProxy  = require('express-request-proxy')


//index of events
eventRouter.get('/events', (req, res) => {
  console.log('request for ALL events')
  Event.find({}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json(result)
  })
})


//EVENTS specific to User's neighborhood
eventRouter.get('/events/:userId', (req, res) => {
  var userId = req.params.userId
  var events;
  User.find({_id: userId}, {neighborhoods: true}, (err, data) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    console.log(data)
    data.forEach((hood, index) => {
      Event.find({neighborhood: hood}, (err, arrayOfObjects) => {
        if (err) return res.status(500).json({msg: 'Server Error'})
        if (index == 1){
          events.concat(arrayOfObjects)
        } else {
          events = arrayOfObjects
        }
      })
    })
    console.log(events)
    res.status(200).json(events)
  })
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
        console.log('^^^^^^^^^^^^^')
        console.log('^^^^^^^^^^^^^')
        console.log('^^^^^^^^^^^^^')
        // console.log(result)
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
    res.status(200).json(result)
  })
})

//update event  AUTH creator
eventRouter.put('/event/:id', (req, res) => {
  //auth for creator
  var newData = req.body
  delete newData._creator
  delete newData._id
  Event.update({_id: req.params.id}, newData, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    res.status(200).json({msg: 'Successfully updated event'})
  })
})

//add attendee
//body must contain {"userId": "494934930300030303"}, so that Event $addToSet make
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

const mongoose = require('mongoose')

var eventSchema = new mongoose.Schema({
    title:        {type: String, required: true},
    neighborhood: {type: String},
    description:  {type: String},
    interestTags: {type: Array},
    startTime:    {type: Date, default: Date.now},
    endTime:      {type: Date},
    locationData: {type: Object},
    address:      {type: String},
    addressName:  {type: String},
    _attendees:   {type: Array},
    _creator:     {type: String},
    picture:      {type: String},
    invitees:     {type: Array},
    created_at:   {type: Date, required: true, default: Date.now},
    locationData: {type: Object}
})

module.exports = exports = mongoose.model('Event', eventSchema)

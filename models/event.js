const mongoose = require('mongoose')

var eventSchema = new mongoose.Schema({
    title:        {type: String, required: true},
    description:  {type: String},
    interestTags: {type: Array, required: true},
    startTime:    {type: Date, default: Date.now},
    endTime:      {type: Date},
    address:      {type: String, required: true},
    addressName:  {type: String},
    _attendees:   {type: Array},
    _creator:     {type: String},
    picture:      {type: String},
    invitees:     {type: Array},
    created_at:   {type: Date, required: true, default: Date.now}
})

module.exports = exports = mongoose.model('Event', eventSchema)

const mongoose = require(mongoose)

var eventSchema = new mongoose.Schema({
    title:        String,
    description:  String,
    interestTags: Array,
    startTime:    Date,
    endTime:      Date,
    address:      String,
    addressName:  String,
    _attendees:   Array,
    _creator:     String,
    picture:      String,
    invites:      Array
})

module.exports = exports = mongoose.model('Event', eventSchema)

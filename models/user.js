const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    firstName:     String,
    lastName:      String,
    email:         String,
    bio:           String,
    interests:     Array, //max of 5
    neighborhoods: Array, //max 2
    pic:           String,
    rating:        Number,
    _favorites:    Array
})

module.exports = exports = mongoose.model('User', userSchema)


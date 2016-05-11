const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    firstName:     {type: String, required: true},
    lastName:      {type: String},
    email:         {type: String, required: true},
    bio:           {type: String},
    interests:     {type: Array, required: true}, //max of 5
    neighborhoods: {type: Array, required: true}, //max 2
    pic:           {type: String, required: true},
    rating:        {type: Number},
    _favorites:    {type: Array},
    created_at:    {type: Date, required: true, default: Date.now }
})

module.exports = exports = mongoose.model('User', userSchema)


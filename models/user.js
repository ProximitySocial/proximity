const mongoose = require('mongoose')

function arrayLimit(val) {
  return val.length <= 2;
}

function interestsLimit(val) {
  return val.length <= 5;
}

var userSchema = new mongoose.Schema({
    firstName:     {type: String, required: true},
    lastName:      {type: String, minlength: 1},
    email:         {type: String, required: true},
    bio:           {type: String},
    interests:     {type: Array,
                    validate: [interestsLimit, '{PATH} exceeds the limit of 5']}, //max of 5
    neighborhoods: {type: Array,
                    validate: [arrayLimit, '{PATH} exceeds the limit of 2']}, //max 2
    pic:           {type: String},
    rating:        {type: Number},
    _favorites:    {type: Array},
    provider:      {type: String},
    facebook:      {type: Object},
    access_token:  {type: String},
    created_at:    {type: Date, required: true, default: Date.now }
})

module.exports = exports = mongoose.model('User', userSchema)


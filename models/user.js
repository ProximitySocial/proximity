const mongoose = require('mongoose')

function arrayLimit(val) {
  return val.length <= 2;
}

function interestsLimit(val) {
  return val.length <= 5;
}

var user = new mongoose.Schema({
    firstName:     {type: String, required: true},
    lastName:      {type: String, minlength: 1},
    email:         {type: String, required: true},
    bio:           {type: String},
    pic:           {type: String},
    rating:        {type: Number},
    _favorites:    {type: Array},
    provider:      {type: String},
    facebook:      {type: Object},
    access_token:  {type: String},
    salt:          {type: String},
    hash:          {type: String},
    interests:     {type: Array,
                    validate: [interestsLimit, '{PATH} exceeds the limit of 5']}, //max of 5
    neighborhoods: {type: Array,
                    validate: [arrayLimit, '{PATH} exceeds the limit of 2']}, //max 2
    created_at:    {type: Date, required: true, default: Date.now }
    // modified_at:   {type: Date, required: true, default: Date.now }
})
user.methods.setHash = function(fbid){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(fbid, this.salt, 1000, 64).toString('hex');
};

//the Hash is a 'WANNA BE' valid hash.    So its wbHash//// IF YOUR STUCK.....get to the moment, its the place when all releases and the answer is right around the corner.. NOW.  GET THERE!!!
user.methods.validHash = function(hash){
  var wbHash = crypto.pbkdf2Sync(hash, this.salt, 1000, 64).toString('hex');
  return wbHash === this.hash;
};

user.methods.generateJWT = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  // exp.setMinutes(today.getMinutes() + 2); /// 2 minutes later it will expire()
  exp.setDate(today.getDate() + 1); /// 1 day later it expires

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.VC_SECRET_CRYPTO || 'secret');
};

module.exports = exports = mongoose.model('User', user)


// First run this file in node, then copy, the go to Mongo Shell:
// var = arr;  arr.forEach(function(obj){db.users.insert(obj)})
const Faker = require('faker')
const hoods = ['Belltown', 'Queen Anne', 'Capitol Hill']
const interests = ['golf', 'running', 'stretching', 'cooking', 'coding', 'lifting', 'drivingRange', 'talking', 'happyHour']
var finalArr = [
{
"firstName":     "Imran",
"lastName":      "Aziz",
"email":         "imranaz@outlook.com",
"bio":           "Squash, golf and Viva City!",
"interests":     ["golf", "squash", "coding", "hiking", "happyhour"],
"neighborhoods": ["Belltown", "Queen Anne"],
"pic":          "https://yt3.ggpht.com/-0r-nSv_ZL24/AAAAAAAAAAI/AAAAAAAAAAA/uR3A4pGOlB4/s900-c-k-no-rj-c0xffffff/photo.jpg",
"rating":        5,
"_favorites":    []
},
{
"firstName":     "Brian",
"lastName":      "Ray",
"email":         "bray213@gmail.com",
"bio":           "VivaCity! Abundance and the moment are my games....get some!",
"interests":     ["golf", "business", "coding", "sailing", "happyhour"],
"neighborhoods": ["Belltown", "Capitol Hill"],
"pic":          "http://www.brianray.com/index.php/photos",
"rating":        5,
"_favorites":    []
},
{

"firstName": "Ed",
"lastName": "Peshtaz",
"email": "edrease@gmail.com",
"bio": "Let's play some bball! I'll rebound for you",
"interests": ["coding", "basketball"],
"neighborhoods": ["Belltown", "Capitol Hill"],
"pic": "https://avatars3.githubusercontent.com/u/10901595?v=3&s=460",
"rating": 5,
"_favorites": []
},
{
"firstName": "Chris",
"lastName": "Lee",
"email": "yensen@gmail.com",
"bio": "Evernote > Notes",
"interests": ["hockey", "soccer"],
"neighborhoods": ["Capitol Hill", "Queen Anne"],
"pic": "https://avatars0.githubusercontent.com/u/14864035?v=3&s=460",
"rating": 5,
"_favorites": []
},
{
"firstName": "Rosa",
"lastName": "Star",
"email": "rafawarrior@gmail.com",
"bio": "Saurkraut and mountain cabins!",
"interests": ["circus", "handstands", "writing", "hiking", "homesteading"],
"neighborhoods": ["Madrona", "Sodo"],
"pic": "http://rosannahstar.weebly.com/photos--press.html#PhotoSwipe1463679043487",
"rating": 5,
"_favorites": []
}
]

function genRandNum(limit) {
  return Math.floor(Math.random() * limit)
}

function genRandSelectArray(array, max) {
  var copy = array.slice()
  var randSelectArray = []
  var randNum = genRandNum(max) + 1
  for (var i = 0; i < randNum; i++){
    var newRand = genRandNum(copy.length)
    var selected = (copy[newRand] !== undefined) ? copy[newRand] : copy.last
    randSelectArray.push(selected)
    copy.splice(copy.indexOf(selected), 1)
  }
  return randSelectArray
}

var User = function() {
  this.email      = Faker.internet.email(),
  this.firstName  = Faker.name.firstName(),
  this.lastName   = Faker.name.lastName(),
  this.bio        = Faker.lorem.paragraph(2),
  this.interests  = genRandSelectArray(interests, 5),
  this.pic        = Faker.image.avatar(),
  this.created_at = Date.now(),
  this.rating     = genRandNum(10),
  this.neighborhoods = genRandSelectArray(hoods, 2)
}

// NUMBER OF USERS 300
for (var i = 1; i < 100; i++){
  finalArr.push(new User())
}

console.log(finalArr)

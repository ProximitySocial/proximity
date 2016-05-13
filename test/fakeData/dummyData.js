// First run this file in node, then copy, the go to Mongo Shell:
// var = arr;  arr.forEach(function(obj){db.users.insert(obj)})
const Faker = require('faker')
const hoods = ['Belltown', 'Queen Anne', 'Capitol Hill']
const interests = ['golf', 'running', 'stretching', 'cooking', 'coding', 'lifting', 'drivingRange', 'talking', 'happyHour']
var finalArr = []

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

var User = function(){
  this.email      = Faker.internet.email(),
  this.firstName  = Faker.name.firstName(),
  this.lastName   = Faker.name.lastName(),
  this.bio        = Faker.lorem.paragraph(2),
  this.interests  = genRandSelectArray(interests, 5),
  this.pic        = Faker.image.avatar(),
  this.created_at = Faker.date.past().toString(),
  this.rating     = genRandNum(10)
}

// NUMBER OF USERS 300
for (var i = 1; i < 300; i++){
  finalArr.push(user)
}

console.log(finalArr)


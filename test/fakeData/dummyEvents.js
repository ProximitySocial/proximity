// First run this file in node, then copy, the go to Mongo Shell:
// var = arr;  arr.forEach(function(obj){db.events.insert(obj)})
const Faker = require('faker')
const people = [
   "573ca6f8522a732dff9cb619", "573ca6f8522a732dff9cb618", "573ca6f8522a732dff9cb617", "573ca6f8522a732dff9cb616", "573ca6f8522a732dff9cb615", "573ca6f8522a732dff9cb614", "573ca6f8522a732dff9cb613", "573ca6f8522a732dff9cb612", "573ca6f8522a732dff9cb611"
 ]
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

// console.log(genRandSelectArray(people, 10))
var Event = function(){
  this.created_at   = Faker.date.past().toString(),
  this.title        = Faker.random.words(),
  this.description  = Faker.lorem.paragraph(2),
  this.interestTags = interests[genRandNum(interests.length)]
  this.startTime    = Faker.date.past().toString(),
  this.endTime      = Faker.date.future(10).toString(),
  this.address      = Faker.address.streetAddress(),
  this.addressName  = Faker.random.locale(),
  this._attendees   = genRandSelectArray(people, 10),
  this._creator     = people[genRandNum(people.length)],
  this.picture      = Faker.image.image(),
  this.invitees     = genRandSelectArray(people, 10),
  this.neighborhood = genRandSelectArray(hoods, 1).toString()
}

// NUMBER OF USERS 300

for (var i = 1; i < 74; i++){
  finalArr.push(new Event())
}

console.log(finalArr)

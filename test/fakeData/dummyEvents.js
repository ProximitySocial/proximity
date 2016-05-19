// First run this file in node, then copy, the go to Mongo Shell:
// var = arr;  arr.forEach(function(obj){db.events.insert(obj)})
const Faker = require('faker')
const people = ["573c0b4cb5d6cd923d34fab8", "573c0b4db5d6cd923d34fab9", "573c0b4db5d6cd923d34faba", "573c0b4eb5d6cd923d34fabb", "573c0b4eb5d6cd923d34fabc", "573c0b4eb5d6cd923d34fabd", "573c0b4eb5d6cd923d34fabe", "573c0b4eb5d6cd923d34fabf", "573c0b4eb5d6cd923d34fac0", "573c0b4eb5d6cd923d34fac1", "573c0b4eb5d6cd923d34fac2", "573c0b4fb5d6cd923d34fac3", "573c0b4fb5d6cd923d34fac4", "573c0b4fb5d6cd923d34fac5", "573c0b53b5d6cd923d34fac6", "573c0b53b5d6cd923d34fac7", "573c0b53b5d6cd923d34fac8", "573c0b54b5d6cd923d34fac9", "573c0b54b5d6cd923d34faca", "573c0b54b5d6cd923d34facb", "573c0b54b5d6cd923d34facc", "573c0b55b5d6cd923d34facd", "573c0b55b5d6cd923d34face", "573c0b55b5d6cd923d34facf", "573c0b55b5d6cd923d34fad0", "573c0b55b5d6cd923d34fad1", "573c0b56b5d6cd923d34fad2", "573c0b56b5d6cd923d34fad3", "573c0b56b5d6cd923d34fad4", "573c0b56b5d6cd923d34fad5", "573c0b56b5d6cd923d34fad6", "573c0b56b5d6cd923d34fad7", "573c0b56b5d6cd923d34fad8", "573c0b56b5d6cd923d34fad9", "573c0b57b5d6cd923d34fada", "573c0b57b5d6cd923d34fadb", "573c0b57b5d6cd923d34fadc", "573c0b58b5d6cd923d34fadd", "573c0b59b5d6cd923d34fade", "573c0b59b5d6cd923d34fadf", "573c0b59b5d6cd923d34fae0", "573c0b59b5d6cd923d34fae1", "573c0b59b5d6cd923d34fae2", "573c0b59b5d6cd923d34fae3", "573c0b59b5d6cd923d34fae4", "573c0b59b5d6cd923d34fae5", "573c0b5ab5d6cd923d34fae6", "573c0b5ab5d6cd923d34fae7", "573c0b5ab5d6cd923d34fae8", "573c0b5ab5d6cd923d34fae9", "573c0b5ab5d6cd923d34faea", "573c0b5ab5d6cd923d34faeb", "573c0b5bb5d6cd923d34faec", "573c0b5bb5d6cd923d34faed", "573c0b5bb5d6cd923d34faee", "573c0b5bb5d6cd923d34faef", "573c0b5bb5d6cd923d34faf0", "573c0b5bb5d6cd923d34faf1", "573c0b5bb5d6cd923d34faf2", "573c0b5bb5d6cd923d34faf3", "573c0b5bb5d6cd923d34faf4", "573c0b5cb5d6cd923d34faf5", "573c0b5db5d6cd923d34faf6", "573c0b5db5d6cd923d34faf7", "573c0b5db5d6cd923d34faf8", "573c0b5db5d6cd923d34faf9", "573c0b5db5d6cd923d34fafa", "573c0b5db5d6cd923d34fafb", "573c0b5db5d6cd923d34fafc", "573c0b5db5d6cd923d34fafd", "573c0b5db5d6cd923d34fafe", "573c0b5db5d6cd923d34faff", "573c0b5eb5d6cd923d34fb00", "573c0b5eb5d6cd923d34fb01", "573c0b5eb5d6cd923d34fb02", "573c0b5eb5d6cd923d34fb03", "573c0b5eb5d6cd923d34fb04", "573c0b5fb5d6cd923d34fb05", "573c0b5fb5d6cd923d34fb06", "573c0b5fb5d6cd923d34fb07", "573c0b5fb5d6cd923d34fb08", "573c0b5fb5d6cd923d34fb09", "573c0b5fb5d6cd923d34fb0a", "573c0b5fb5d6cd923d34fb0b", "573c0b61b5d6cd923d34fb0c", "573c0b61b5d6cd923d34fb0d", "573c0b61b5d6cd923d34fb0e", "573c0b61b5d6cd923d34fb0f", "573c0b61b5d6cd923d34fb10", "573c0b61b5d6cd923d34fb11", "573c0b61b5d6cd923d34fb12", "573c0b61b5d6cd923d34fb13", "573c0b62b5d6cd923d34fb14", "573c0b62b5d6cd923d34fb15", "573c0b62b5d6cd923d34fb16", "573c0b62b5d6cd923d34fb17", "573c0b62b5d6cd923d34fb18", "573c0b62b5d6cd923d34fb19", "573c0b62b5d6cd923d34fb1a", "573c0b62b5d6cd923d34fb1b"]
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




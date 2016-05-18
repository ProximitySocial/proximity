// First run this file in node, then copy, the go to Mongo Shell:
// var = arr;  arr.forEach(function(obj){db.events.insert(obj)})
const Faker = require('faker')
const people = [
   "573253822503f4d80bd7862b", "5732af6c9a014b99ce613574", "5732af6c9a014b99ce613575", "5732af6c9a014b99ce613576", "5732af6c9a014b99ce613577", "5732af6c9a014b99ce613578", "5732af6c9a014b99ce613579", "5732af6c9a014b99ce61357a", "5732af6c9a014b99ce61357b", "5732af6c9a014b99ce61357c", "5732af6c9a014b99ce61357d", "5732af6c9a014b99ce61357e", "5732af6c9a014b99ce61357f", "5732af6c9a014b99ce613580", "5732af6c9a014b99ce613581", "5732af6c9a014b99ce613582", "5732af6c9a014b99ce613583", "5732af6c9a014b99ce613584", "5732af6c9a014b99ce613585", "5732af6c9a014b99ce613586", "5732af6c9a014b99ce613587", "5732af6c9a014b99ce613588", "5732af6c9a014b99ce613589", "5732af6c9a014b99ce61358a", "5732af6c9a014b99ce61358b", "5732af6c9a014b99ce61358c", "5732af6c9a014b99ce61358d", "5732af6c9a014b99ce61358e", "5732af6c9a014b99ce61358f", "5732af6c9a014b99ce613590", "5732af6c9a014b99ce613591", "5732af6c9a014b99ce613592", "5732af6c9a014b99ce613593", "5732af6c9a014b99ce613594", "5732af6c9a014b99ce613595", "5732af6c9a014b99ce613596", "5732af6c9a014b99ce613597", "5732af6c9a014b99ce613598", "5732af6c9a014b99ce613599", "5732af6c9a014b99ce61359a","5732af6c9a014b99ce61359b","5732af6c9a014b99ce61359c","5732af6c9a014b99ce61359d","5732af6c9a014b99ce61359e","5732af6c9a014b99ce61359f","5732af6c9a014b99ce6135a0","5732af6c9a014b99ce6135a1","5732af6c9a014b99ce6135a2","5732af6c9a014b99ce6135a3","5732af6c9a014b99ce6135a4","5732af6c9a014b99ce6135a5","5732af6c9a014b99ce6135a6","5732af6c9a014b99ce6135a7","5732af6c9a014b99ce6135a8","5732af6c9a014b99ce6135a9","5732af6c9a014b99ce6135aa","5732af6c9a014b99ce6135ab","5732af6c9a014b99ce6135ac","5732af6c9a014b99ce6135ad", "5732af6c9a014b99ce6135ae"
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

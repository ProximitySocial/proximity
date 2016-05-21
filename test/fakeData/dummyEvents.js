// First run this file in node, then copy, the go to Mongo Shell:
// var = arr;  arr.forEach(function(obj){db.events.insert(obj)})
const Faker = require('faker')
var people = ["573f7eeb553b249085c885a4", "573f7eeb553b249085c885a5", "573f7eeb553b249085c885a6", "573f7eec553b249085c885a7", "573f7eec553b249085c885a8", "573f7eec553b249085c885a9", "573f7eec553b249085c885aa", "573f7eec553b249085c885ab", "573f7eec553b249085c885ac", "573f7eec553b249085c885ad", "573f7eec553b249085c885ae", "573f7eec553b249085c885af", "573f7eed553b249085c885b0", "573f7eed553b249085c885b1", "573f7eed553b249085c885b2", "573f7eed553b249085c885b3", "573f7eed553b249085c885b4", "573f7eed553b249085c885b5", "573f7eed553b249085c885b6", "573f7eed553b249085c885b7", "573f7eed553b249085c885b8", "573f7eee553b249085c885b9", "573f7eee553b249085c885ba", "573f7eee553b249085c885bb", "573f7eef553b249085c885bc", "573f7ef0553b249085c885bd", "573f7ef0553b249085c885be", "573f7ef0553b249085c885bf", "573f7ef1553b249085c885c0", "573f7ef1553b249085c885c1", "573f7ef1553b249085c885c2", "573f7ef1553b249085c885c3", "573f7ef1553b249085c885c4", "573f7ef1553b249085c885c5", "573f7ef2553b249085c885c6", "573f7ef2553b249085c885c7", "573f7ef3553b249085c885c8", "573f7ef3553b249085c885c9", "573f7ef3553b249085c885ca", "573f7ef3553b249085c885cb", "573f7ef3553b249085c885cc", "573f7ef3553b249085c885cd", "573f7ef3553b249085c885ce", "573f7ef3553b249085c885cf", "573f7ef4553b249085c885d0", "573f7ef4553b249085c885d1", "573f7ef4553b249085c885d2", "573f7ef6553b249085c885d3", "573f7ef7553b249085c885d4", "573f7ef7553b249085c885d5", "573f7ef7553b249085c885d6", "573f7ef7553b249085c885d7", "573f7ef7553b249085c885d8", "573f7ef7553b249085c885d9", "573f7ef7553b249085c885da", "573f7ef7553b249085c885db", "573f7ef8553b249085c885dc", "573f7ef8553b249085c885dd", "573f7ef8553b249085c885de", "573f7ef8553b249085c885df", "573f7ef8553b249085c885e0", "573f7ef8553b249085c885e1", "573f7ef8553b249085c885e2", "573f7ef8553b249085c885e3", "573f7ef8553b249085c885e4", "573f7ef8553b249085c885e5", "573f7ef8553b249085c885e6", "573f7ef9553b249085c885e7", "573f7ef9553b249085c885e8", "573f7ef9553b249085c885e9", "573f7efb553b249085c885ea", "573f7efb553b249085c885eb", "573f7efb553b249085c885ec", "573f7efb553b249085c885ed", "573f7efb553b249085c885ee", "573f7efb553b249085c885ef", "573f7efb553b249085c885f0", "573f7efb553b249085c885f1", "573f7efb553b249085c885f2", "573f7efc553b249085c885f3", "573f7efc553b249085c885f4", "573f7efd553b249085c885f5", "573f7efd553b249085c885f6", "573f7efd553b249085c885f7", "573f7efd553b249085c885f8", "573f7efd553b249085c885f9", "573f7efd553b249085c885fa", "573f7efe553b249085c885fb", "573f7efe553b249085c885fc", "573f7efe553b249085c885fd", "573f7efe553b249085c885fe", "573f7efe553b249085c885ff", "573f7f00553b249085c88600", "573f7f00553b249085c88601", "573f7f00553b249085c88602", "573f7f00553b249085c88603", "573f7f00553b249085c88604", "573f7f00553b249085c88605", "573f7f00553b249085c88606", "573f7f00553b249085c88607", "573f7f00553b249085c88608", "573f7f00553b249085c88609", "573f7f01553b249085c8860a", "573f7f01553b249085c8860b"]
const hoods = ['Belltown', 'Queen Anne', 'Capitol Hill']
const interests = ['golf', 'running', 'stretching', 'cooking', 'coding', 'lifting', 'drivingRange', 'talking', 'happyHour']
var startTimes = ["Fri May 20 2016 14:25:51 GMT-0800 (PST)", "Fri May 20 2016 23:25:54 GMT-0800 (PST)", "Tues May 31 2016 20:25:54 GMT-0800 (PST)", "Sun May 29 2016 14:25:51 GMT-0800 (PST)", "Thurs May 19 2016 18:25:54 GMT-0800 (PST)", "Thurs May 19 2016 14:25:51 GMT-0800 (PST)", "Wed May 18 2016 18:25:54 GMT-0800 (PST)", "Wed May 18 2016 14:25:51 GMT-0800 (PST)", "Wed May 25 2016 14:25:51 GMT-0800 (PST)", "Tues May 26 2016 14:25:51 GMT-0800 (PST)", "Fri May 20 2016 14:25:51 GMT-0800 (PST)", "Fri May 20 2016 16:25:51 GMT-1000 (PST)", "Fri May 20 2016 18:25:51 GMT-1200 (PST)",]
var peopleObjs = [{ "_id" : "573f7eeb553b249085c885a5", "pic" : "http://www.brianray.com/index.php/photos" },{ "_id" : "573f7eeb553b249085c885a6", "pic" : "https://avatars3.githubusercontent.com/u/10901595?v=3&s=460" },{ "_id" : "573f7eec553b249085c885a7", "pic" : "https://avatars0.githubusercontent.com/u/14864035?v=3&s=460" },{ "_id" : "573f7eec553b249085c885a8", "pic" : "http://rosannahstar.weebly.com/photos--press.html#PhotoSwipe1463679043487" },{ "_id" : "573f7eec553b249085c885a9", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/davecraige/128.jpg" },{ "_id" : "573f7eec553b249085c885aa", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/sangdth/128.jpg" },{ "_id" : "573f7eec553b249085c885ab", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/markwienands/128.jpg" },{ "_id" : "573f7eec553b249085c885ac", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/128.jpg" },{ "_id" : "573f7eec553b249085c885ad", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/bowbrick/128.jpg" },{ "_id" : "573f7eec553b249085c885ae", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/collegeman/128.jpg" },{ "_id" : "573f7eec553b249085c885af", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/jqiuss/128.jpg" },{ "_id" : "573f7eed553b249085c885b0", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/yalozhkin/128.jpg" },{ "_id" : "573f7eed553b249085c885b1", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/mslarkina/128.jpg" },{ "_id" : "573f7eed553b249085c885b2", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/johnriordan/128.jpg" },{ "_id" : "573f7eed553b249085c885b3", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/rob_thomas10/128.jpg" },{ "_id" : "573f7eed553b249085c885b4", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg" },{ "_id" : "573f7eed553b249085c885b5", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/namankreative/128.jpg" },{ "_id" : "573f7eed553b249085c885b6", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg" },{ "_id" : "573f7eed553b249085c885b7", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/mfacchinello/128.jpg" },{ "_id" : "573f7eed553b249085c885b8", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/mrmartineau/128.jpg" },{ "_id" : "573f7eee553b249085c885b9", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/thehacker/128.jpg" },{ "_id" : "573f7eee553b249085c885ba", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/geobikas/128.jpg" },{ "_id" : "573f7eee553b249085c885bb", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/stalewine/128.jpg" },{ "_id" : "573f7eef553b249085c885bc", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/vickyshits/128.jpg" },{ "_id" : "573f7ef0553b249085c885bd", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/akmalfikri/128.jpg" },{ "_id" : "573f7ef0553b249085c885be", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/ruehldesign/128.jpg" },{ "_id" : "573f7ef0553b249085c885bf", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/adityasutomo/128.jpg" },{ "_id" : "573f7ef1553b249085c885c0", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/ky/128.jpg" },{ "_id" : "573f7ef1553b249085c885c1", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/jerrybai1907/128.jpg" },{ "_id" : "573f7ef1553b249085c885c2", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/nickfratter/128.jpg" },{ "_id" : "573f7ef1553b249085c885c3", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/thomasschrijer/128.jpg" },{ "_id" : "573f7ef1553b249085c885c4", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/vikashpathak18/128.jpg" },{ "_id" : "573f7ef1553b249085c885c5", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/laasli/128.jpg" },{ "_id" : "573f7ef2553b249085c885c6", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/antjanus/128.jpg" },{ "_id" : "573f7ef2553b249085c885c7", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/fuck_you_two/128.jpg" },{ "_id" : "573f7ef3553b249085c885c8", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/lu4sh1i/128.jpg" },{ "_id" : "573f7ef3553b249085c885c9", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/dudestein/128.jpg" },{ "_id" : "573f7ef3553b249085c885ca", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/knilob/128.jpg" },{ "_id" : "573f7ef3553b249085c885cb", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/olgary/128.jpg" },{ "_id" : "573f7ef3553b249085c885cc", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/rude/128.jpg" },{ "_id" : "573f7ef3553b249085c885cd", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/looneydoodle/128.jpg" },{ "_id" : "573f7ef3553b249085c885ce", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/vytautas_a/128.jpg" },{ "_id" : "573f7ef3553b249085c885cf", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/dhooyenga/128.jpg" },{ "_id" : "573f7ef4553b249085c885d0", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/timothycd/128.jpg" },{ "_id" : "573f7ef4553b249085c885d1", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/itsajimithing/128.jpg" },{ "_id" : "573f7ef4553b249085c885d2", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/mirfanqureshi/128.jpg" },{ "_id" : "573f7ef6553b249085c885d3", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/gearpixels/128.jpg" },{ "_id" : "573f7ef7553b249085c885d4", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/mahdif/128.jpg" },{ "_id" : "573f7ef7553b249085c885d5", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/emmandenn/128.jpg" },{ "_id" : "573f7ef7553b249085c885d6", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/enjoythetau/128.jpg" },{ "_id" : "573f7ef7553b249085c885d7", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/gseguin/128.jpg" },{ "_id" : "573f7ef7553b249085c885d8", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/lepetitogre/128.jpg" },{ "_id" : "573f7ef7553b249085c885d9", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/timgthomas/128.jpg" },{ "_id" : "573f7ef7553b249085c885da", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/shanehudson/128.jpg" },{ "_id" : "573f7ef7553b249085c885db", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/robinlayfield/128.jpg" },{ "_id" : "573f7ef8553b249085c885dc", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/mandalareopens/128.jpg" },{ "_id" : "573f7ef8553b249085c885dd", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg" },{ "_id" : "573f7ef8553b249085c885de", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/_dwite_/128.jpg" },{ "_id" : "573f7ef8553b249085c885df", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/aaroni/128.jpg" },{ "_id" : "573f7ef8553b249085c885e0", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/unterdreht/128.jpg" },{ "_id" : "573f7ef8553b249085c885e1", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/olaolusoga/128.jpg" },{ "_id" : "573f7ef8553b249085c885e2", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/thehacker/128.jpg" },{ "_id" : "573f7ef8553b249085c885e3", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/hellofeverrrr/128.jpg" },{ "_id" : "573f7ef8553b249085c885e4", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/kudretkeskin/128.jpg" },{ "_id" : "573f7ef8553b249085c885e5", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/sterlingrules/128.jpg" },{ "_id" : "573f7ef8553b249085c885e6", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/n_tassone/128.jpg" },{ "_id" : "573f7ef9553b249085c885e7", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/betraydan/128.jpg" },{ "_id" : "573f7ef9553b249085c885e8", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/Chakintosh/128.jpg" },{ "_id" : "573f7ef9553b249085c885e9", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/jjshaw14/128.jpg" },{ "_id" : "573f7efb553b249085c885ea", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/michaelcomiskey/128.jpg" },{ "_id" : "573f7efb553b249085c885eb", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/abelcabans/128.jpg" },{ "_id" : "573f7efb553b249085c885ec", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg" },{ "_id" : "573f7efb553b249085c885ed", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/derienzo777/128.jpg" },{ "_id" : "573f7efb553b249085c885ee", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/herbigt/128.jpg" },{ "_id" : "573f7efb553b249085c885ef", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/reetajayendra/128.jpg" },{ "_id" : "573f7efb553b249085c885f0", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/incubo82/128.jpg" },{ "_id" : "573f7efb553b249085c885f1", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/osmond/128.jpg" },{ "_id" : "573f7efb553b249085c885f2", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg" },{ "_id" : "573f7efc553b249085c885f3", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/karlkanall/128.jpg" },{ "_id" : "573f7efc553b249085c885f4", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/aiiaiiaii/128.jpg" },{ "_id" : "573f7efd553b249085c885f5", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/matt3224/128.jpg" },{ "_id" : "573f7efd553b249085c885f6", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/vimarethomas/128.jpg" },{ "_id" : "573f7efd553b249085c885f7", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/damenleeturks/128.jpg" },{ "_id" : "573f7efd553b249085c885f8", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/itolmach/128.jpg" },{ "_id" : "573f7efd553b249085c885f9", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg" },{ "_id" : "573f7efd553b249085c885fa", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/richardgarretts/128.jpg" },{ "_id" : "573f7efe553b249085c885fb", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/stefvdham/128.jpg" },{ "_id" : "573f7efe553b249085c885fc", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/brandonflatsoda/128.jpg" },{ "_id" : "573f7efe553b249085c885fd", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/markolschesky/128.jpg" },{ "_id" : "573f7efe553b249085c885fe", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/axel/128.jpg" },{ "_id" : "573f7efe553b249085c885ff", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/nicolai_larsen/128.jpg" },{ "_id" : "573f7f00553b249085c88600", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/bradenhamm/128.jpg" },{ "_id" : "573f7f00553b249085c88601", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/mrxloka/128.jpg" },{ "_id" : "573f7f00553b249085c88602", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/magoo04/128.jpg" },{ "_id" : "573f7f00553b249085c88603", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/allagringaus/128.jpg" },{ "_id" : "573f7f00553b249085c88604", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/kaspernordkvist/128.jpg" },{ "_id" : "573f7f00553b249085c88605", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/terryxlife/128.jpg" },{ "_id" : "573f7f00553b249085c88606", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/mizhgan/128.jpg" },{ "_id" : "573f7f00553b249085c88607", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg" },{ "_id" : "573f7f00553b249085c88608", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/joshaustin/128.jpg" },{ "_id" : "573f7f00553b249085c88609", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/brandonburke/128.jpg" },{ "_id" : "573f7f01553b249085c8860a", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/puzik/128.jpg" },{ "_id" : "573f7f01553b249085c8860b", "pic" : "https://s3.amazonaws.com/uifaces/faces/twitter/jonkspr/128.jpg" }]



var finalArr = [{
"title": "Walking Brainstorm - Abundant Wealth",
"neighborhood": "Seward Park",
"description": "Nature is abundant, so is money.",
"interestTags": ["Walking"],
"startTime": "Wed May 18 2016 14:25:51 GMT-0800 (PST)",
"endTime": "Wed May 18 2016 18:25:54 GMT-0800 (PST)",
"address": "5900 Lake Washington Blvd. S, Seattle, WA 98118",
"addressName": "Seward's Park",
"_attendees": [],
"picture": " http://walkinginseattle.org/wp-content/uploads/2010/03/07-IMG_6680-edited.jpg "
},
{
"title": "Handstand Jam",
"neighborhood": "Sodo",
"description": "handstands and spotting for presses",
"interestTags": ["handstands", "circus"],
"startTime": "Thurs May 19 2016 14:25:51 GMT-0800 (PST)",
"endTime": "Thurs May 19 2016 18:25:54 GMT-0800 (PST)",
"address": "2702 6th Ave S, Seattle, WA 98134",
"addressName": "Emerald City Trapeze Arts",
"_attendees": [],
"picture": "http://emeraldcitytrapeze.com/wp-content/uploads/2015/05/17993443498_63e10c6133_k.jpg"
},
{
"title": "Belltown Hackathon",
"neighborhood": "Belltown",
"description": "Demonstrate your coding chops",
"interestTags": ["coding", "JavaScript"],
"startTime": "Sun May 29 2016 14:25:51 GMT-0800 (PST)",
"endTime": "Tues May 31 2016 20:25:54 GMT-0800 (PST)",
"address": "2901 3rd Ave, Seattle, WA 98121",
"addressName": "Code Fellows",
"_attendees": [],
"picture": "http://edtechtimes.com/wp-content/uploads/2014/05/CodeFellows.png"
},
{
"title": "Block Party at Peso's",
"neighborhood": "Queen Anne",
"description": "Come out and meet your neighbors",
"interestTags": ["food", "fine dining"],
"startTime": "Fri May 20 2016 14:25:51 GMT-0800 (PST)",
"endTime": "Fri May 20 2016 23:25:54 GMT-0800 (PST)",
"address": "605 Queen Anne Ave N, Seattle, WA 98109",
"addressName": "Peso's Kitchen and Lounge",
"_attendees": [],
"picture": "http://pesoskitchenandlounge.com/media/Pesos-Logo.png"
}]

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
  this.interestTags = interests[genRandNum(interests.length)],
  this.startTime    = genRandSelectArray(startTimes, 1).toString(),
  this.endTime      = Faker.date.future(10).toString(),
  this.address      = Faker.address.streetAddress(),
  this.addressName  = Faker.random.locale(),
  this._attendees   = genRandSelectArray(people, 15),
  this._creator     = people[genRandNum(people.length)],
  this.picture      = Faker.image.image(),
  this.invitees     = genRandSelectArray(people, 10),
  this.neighborhood = genRandSelectArray(hoods, 1).toString()
}

// NUMBER OF USERS 300

for (var i = 1; i < 30; i++){
  finalArr.push(new Event())
}

console.log(finalArr)

const Event = require(__dirname + '/../models/event')

function updateEvent(newData, eventID, res){
  console.log("updating Event with variables :")
  console.log(newData);
  newData.picture = newData.url;

  Event.findOneAndUpdate({_id: eventID, _creator: newData.userID}, {$set: newData}, {new: true}, (err, result) => {
    if (err) return res.status(500).json({msg: 'Server Error'})
    if (!result) return res.status(400).json({msg: 'Unable to update event'})
    console.log(result);
    res.status(200).json({msg: 'Successfully updated event', result: result, signedRequest: newData.awsData})
  })
}

function formatDate(date) {
  var d = new Date(date);
  var hh = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var dd = "AM";
  var h = hh;
  if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
  if (h == 0) {
        h = 12;
    }
  m = m<10?"0"+m:m;
  s = s<10?"0"+s:s;
  var pattern = new RegExp("0?"+hh+":"+m+":"+s);
  var replacement = h+":"+m;
  /* if you want to add seconds
  replacement += ":"+s;  */
  replacement += " "+dd;

  return replacement
}


module.exports = exports = {updateEvent, formatDate}

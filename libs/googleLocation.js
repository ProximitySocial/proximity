const GoogleMapsAPI = require('googlemaps')
//MOVE THIS TO A LIB FILE

function callGoogle(address, callback){
  var publicConfig = {
    key: process.env.POWWOW_GA_KEY,
    secure: true
  };

  var gmAPI = new GoogleMapsAPI(publicConfig);

  var geocodeParams = { address: address}

  var cb = callback || function() {}
  return new Promise((resolve, reject) => {
    gmAPI.geocode(geocodeParams, (err, data) => {
      if (err) {
        reject(err)
        return cb(err)
      }
      resolve(data);
      return cb(null, data)
    });

  })
}

module.exports = exports = callGoogle

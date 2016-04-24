if (process.env.NODE_ENV === "production") {
  var modeUrl = process.env.MONGOLAB_URI;
} else if (process.env.NODE_ENV === "test") {
  var modeUrl = 'mongodb://127.0.0.1/test';
} else {
  var modeUrl = 'mongodb://127.0.0.1/proximity';
}

module.exports = {
  url: modeUrl
};

//From user CMS on StackOverFlow ::: http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript

Array.prototype.cleanArray = (actual) => {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

module.exports = exports = cleanArray

'use strict'

const express = require('express')
const helperRouter     = module.exports = exports = express.Router()
const request = require('request');
const htmlParser = require('jq-html-parser');

helperRouter.get('/img/:keyword', (routeReq, routeRes) => {
  // TODO add caching
  let url = "http://www.bing.com/images/search?q=" + routeReq.params.keyword + "&qft=+filterui:imagesize-medium"
  request.get(url, function(err, res, body){
    if(err || (res.statusCode != 200)){
      return console.log("An error occured while querying bing for images");
    }

    var parser, result;
    // parse body
    let config = {
      title: "title",
      images: {
        selector: "a",
        attribute: "href",
        regexp: "(.*jpg)",
        multiple: true,
      }
    }
    parser = new htmlParser(config);
    result = parser.parse(body);
    // TODO add returning different images
    routeRes.status(200).json({url: result.images[0]})
  })
})

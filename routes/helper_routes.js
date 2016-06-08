'use strict';

const express = require('express');
const helperRouter     = module.exports = exports = express.Router();
const request = require('request');
const htmlParser = require('jq-html-parser');

helperRouter.get('/helper/img/:keyword', (routeReq, routeRes) => {
  // TODO add caching
	// Search image with the following settings - medium, photo, wide, safe search - strict
	let url = "http://www.bing.com/images/search?q=" + routeReq.params.keyword +
				"&qft=+filterui%3aimagesize-medium+filterui%3aphoto-photo+filterui%3aaspect-wide&adlt=strict";
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
				multiple: true
			}
		};
		parser = new htmlParser(config);
		result = parser.parse(body);
		// TODO add returning different images
		routeRes.status(200).json({url: result.images[0]});
		return null;
	});
});

module.exports = function () {
    var express = require('express');
    const fetch = require("node-fetch");
    var router = express.Router();

	/* This function extracts the current non-expired listings and renders the home page with the data.*/
	function renderItems(req, res, next) {
		var context = {};
		res.render('edititem', context);
	}

	router.get('/', renderItems);
	return router; //Branch test II
}();
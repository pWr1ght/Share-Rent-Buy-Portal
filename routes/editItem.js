module.exports = function () {
    const express = require('express');
    const fetch = require("node-fetch");
    const get_set_items = require('../modules/items.js');
    const router = express.Router();

	/* This function extracts the current non-expired listings and renders the home page with the data.*/
	function renderItems(req, res, next) {
        function setItems(data){
            console.log(data);
            res.render('edititem', {data});
        }
		var context = get_set_items.data.getUsersItems(req.user.id, setItems) ;
	}

	router.get('/', renderItems);
	return router; //Branch test II
}();
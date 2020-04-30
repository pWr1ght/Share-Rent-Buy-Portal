const express = require('express');
const router = express.Router();

//This file contains all routing information

//used to show home page
router.use('/', require('./home.js'));
//add item page
router.use('/addItem', require('./addItem.js'));
//backend api calls - apis are stored in api.js file
router.use('/api', require('./api.js'));

//Displaying Item (By PW)
// router.use('/displayItem', require('/.displayItem.js'));

module.exports = router;

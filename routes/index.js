const express = require('express');
const router = express.Router();

//This file contains all routing information

//used to show home page
router.use('/', require('./home.js'));
//add item page
router.use('/addItem', require('./addItem.js'));
//backend api calls - apis are stored in api.js file
router.use('/api', require('./api.js'));
//aws file storage
router.use('/aws', require('./aws.js'));
//display items
router.use('/searchResults', require('./searchResults'));

module.exports = router;

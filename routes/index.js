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

// Displaying Item (By PW) (feel free to change format)
router.use('/item/:id', function (req, res, next) {
    req.id_label = req.params.id;
    next();
}, require('./displayItem.js'));


module.exports = router;

const express = require('express');
const router = express.Router();

router.use('/', require('./home.js'));
router.use('/addItem', require('./addItem.js'));
router.use('/api', require('./api'));

module.exports = router;

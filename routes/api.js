const express = require('express');
const router = express.Router();
const pool = require('../modules/dbcon').pool;

router.post('/addNewItem', (req, res, next) => {
	var { name, description, price, phone, address, city, state, zip, lat, long } = req.body;
	if (!name || !description || !price || !phone || !address || !city || !state || !zip) {
		res.send({ error1: 'No fields should be empty.' });
		return;
	} else {
		pool.query(
			'INSERT INTO Items (itemName, itemDescription, itemPrice, itemPhone, itemAddress, itemCity, itemState, itemZip, itemLat, itemLong) VALUES (?,?,?,?,?,?,?,?,?,?)',
			[ name, description, price, phone, address, city, state, zip, lat, long ],
			(err, result) => {
				if (err) {
					res.send(err);
				}
				res.send('Success');
			}
		);
	}
});

module.exports = router;

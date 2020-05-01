const express = require('express');
const router = express.Router();
const pool = require('../modules/dbcon').pool;
const fetch = require('node-fetch');

//add dotenv functionality
require('dotenv').config();

//Add new item API
router.post('/addNewItem', async (req, res, next) => {
	if (!req.user) {
		console.log('User not logged in');
		var message = 'User not logged in';
		res.redirect('/login', message);
	} else {
		var { name, description, price, phone, address, city, state, zip, lat, long } = req.body;
		if (!name || !description || !price || !phone || !address || !city || !state || !zip) {
			res.send({ error1: 'No fields should be empty.' });
			return;
		} else {
			var addressString = address + ', ' + city + ', ' + state;
			addressString = addressString.replace(/\s/g, '+');
			var results;
			await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${process.env
					.GOOGLE_API_KEY}`
			)
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					lat = data.results[0].geometry.location.lat;
					long = data.results[0].geometry.location.lng;
				})
				.catch((err) => res.status(500).send({ error: { err } }));
			try {
				pool.query(
					'INSERT INTO Items (userID, catID, itemName, itemDescription, itemPrice, itemPhone, itemAddress, itemCity, ' +
						'itemState, itemZip, itemLat, itemLong) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
					[ req.user.id, 2, name, description, price, phone, address, city, state, zip, lat, long ],
					(err, result) => {
						if (err) {
							res.send(err);
						}
						res.send('Success');
					}
				);
			} catch (err) {
				res.status(500).send({ error: err });
			}
		}
	}
});

//Search API
//Not needed anymore but will keep incase it is
router.post('/search', (req, res) => {
	var lat = req.body.lat;
	var long = req.body.long;
	var item = req.body.search;
	try {
		pool.query(
			'SELECT *, ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat)) * .000621371192 as distance FROM Items WHERE ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat))* .000621371192 < 50 AND itemName COLLATE UTF8_GENERAL_CI LIKE ? ORDER BY DISTANCE ASC LIMIT 1',
			[ long, lat, long, lat, `%${item}%` ],
			(err, result) => {
				if (err) {
					res.send({ err });
					return;
				}
				if (result.length == 0) {
					res.send({ searchResult: result, searchName: item, msg: 'No items found' });
					return;
				}
				var itemInfo = result[0];
				pool.query(
					'SELECT *, ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat)) * .000621371192 as distanceFromSearch,ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat)) * .000621371192 as distanceItemToItem FROM Items WHERE ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat))* .000621371192 < 10 AND itemName COLLATE UTF8_GENERAL_CI LIKE ? ORDER BY distanceFromSearch ASC',
					[
						long,
						lat,
						itemInfo.itemLong,
						itemInfo.itemLat,
						itemInfo.itemLong,
						itemInfo.itemLat,
						`%${item}%`
					],
					(err2, result2) => {
						if (err2) {
							res.send({ err2, msg: 'Error' });
							return;
						}

						if (result2.length == 0) {
							res.send({ searchResult: result2, searchName: item, msg: 'No items found' });
							return;
						}
						console.log({ searchResult: result2 });
						res.send({ searchResult: result2, searchName: item });
					}
				);
			}
		);
	} catch (err) {
		res.status(500).send('displayItems', { error: err });
		return;
	}
});

module.exports = router;

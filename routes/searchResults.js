const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const pool = require('../modules/dbcon').pool;
var hbs = require('handlebars');
router.get('/', (req, res, next) => {
	var { search, lat, long } = req.query;
	var results;
	var item = search;
	try {
		pool.query(
			'SELECT *, ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat)) * .000621371192 as distance FROM Items WHERE ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat))* .000621371192 < 50 AND itemName COLLATE UTF8_GENERAL_CI LIKE ? ORDER BY DISTANCE ASC LIMIT 1',
			[ long, lat, long, lat, `%${item}%` ],
			(err, result) => {
				if (err) {
					res.render('displayItems', { err });
					return;
				}
				if (result.length == 0) {
					res.render('displayItems', {
						searchResult: null,
						searchName: item,
						empty: 'No items within 50 miles'
					});
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
							res.render('displayItems', { err2, msg: 'Error' });
							return;
						}

						if (result2.length == 0) {
							res.render('displayItems', {
								searchResult: result2,
								searchName: item,
								empty: 'No items found'
							});
							return;
						}
					
					
					console.log(result);
					res.render('displayItems', { searchResult: result2, searchName: item });
						return;
					}
				);
			}
		);
	} catch (err) {
		res.status(500).render('displayItems', { error: err });
		return;
	}
});

module.exports = router;

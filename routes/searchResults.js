const express = require('express');
const router = express.Router();
const pool = require('../modules/dbcon').pool;

router.get('/', (req, res) => {
	try {
		closestItemSearchFunc(res, req);
	} catch (err) {
		res.status(500).render('displayItems', { error: err });
		return;
	}
});

closestItemSearchFunc = (res, req) => {
	let { search, lat, long, distance } = req.query;
	let searchItemName = search;
	pool.query(
		'SELECT *, ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat)) * .000621371192 as distance FROM Items WHERE ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat))* .000621371192 < ? AND itemName COLLATE UTF8_GENERAL_CI LIKE ? ORDER BY DISTANCE ASC LIMIT 1',
		[ long, lat, long, lat, distance, `%${searchItemName}%` ],
		(err, result) => {
			if (err) {
				res.render('displayItems', { err });
				return;
			}
			if (result.length == 0) {
				res.render('displayItems', {
					searchResult: null,
					searchName: searchItemName,
					empty: 'No items within 50 miles'
				});
				return;
			}
			let closestItemFound = result[0];
			allFoundItemsFunc(closestItemFound, res, lat, long);
		}
	);
};

allFoundItemsFunc = (closeItem, res, BaseLat, BaseLong) => {
	pool.query(
		'SELECT *, ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat)) * .000621371192 as distanceFromSearch,ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat)) * .000621371192 as distanceItemToItem FROM Items WHERE ST_DISTANCE_SPHERE(POINT(?,?),POINT(itemLong,itemLat))* .000621371192 < 10 AND itemName COLLATE UTF8_GENERAL_CI LIKE ? ORDER BY distanceFromSearch ASC',
		[
			BaseLong,
			BaseLat,
			closeItem.itemLong,
			closeItem.itemLat,
			closeItem.itemLong,
			closeItem.itemLat,
			`%${closeItem.itemName}%`
		],
		(err2, allFoundItems) => {
			if (err2) {
				res.render('displayItems', { err2, msg: 'Error' });
				return;
			}

			if (allFoundItems.length == 0) {
				res.render('displayItems', {
					searchResult: allFoundItems,
					searchName: closeItem.itemName,
					empty: 'No items found'
				});
				return;
			}
			res.render('displayItems', { searchResult: allFoundItems, searchName: closeItem.itemName });
			return;
		}
	);
};

module.exports = router;

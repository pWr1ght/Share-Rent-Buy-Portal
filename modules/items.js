var methods = {

	getUsersItems: function(id, complete) {
		const mysql = require('./dbcon');
		var itemQuery = 'SELECT * FROM unqof373yoc7xedq.Items ' +
		'LEFT JOIN Categories c ON c.categoryId = Items.catID '+
		'LEFT JOIN Users u ON u.userID = Items.userID '+
        'WHERE Items.userID = ?;';
		function returnItems(err, rows, fields) {
			if (err) {
				console.log(err);
			}
			var context ={};
			var queryOut = [];
			for (var row in rows) {
				var item = {
					"id": rows[row].itemID,
					"itemName": rows[row].itemName,
					"itemDescription": rows[row].itemDescription,
					"itemPrice": rows[row].itemPrice,
					"itemPhone": rows[row].itemPhone,
                    "itemAddress": rows[row].itemAddress,
                    "itemCity": rows[row].itemCity,
                    "itemState": rows[row].itemState,
                    "itemZip": rows[row].itemZip,
                    "itemLat": rows[row].itemLat,
                    "itemLong": rows[row].itemLong,
                    "categoryId": rows[row].categoryId,
					"categoryName": rows[row].categoryName,
					"author": rows[row].firstName + ' ' + rows[row].lastName,
					"authorPh": rows[row].userPhone,
					"authorEmail": rows[row].userEmail
				};
				queryOut.push(item);
			}
			//console.log(queryOut);
			context.data = queryOut;
			complete(queryOut);
		}
		mysql.pool.query(itemQuery, id , returnItems);
	},

	getItem: function(id, complete) {
		const mysql = require('./dbcon');
		var itemQuery = 'SELECT * FROM unqof373yoc7xedq.Items ' +
		'LEFT JOIN Categories c ON c.categoryId = Items.catID '+
		'LEFT JOIN Users u ON u.userID = Items.userID '+
        'WHERE Items.itemID = ?;';
		function returnItem(err, rows, fields) {
			if (err) {
				console.log(err);
			}
			var context ={};
				var item = {
					"id": rows[0].itemID,
					"itemName": rows[0].itemName,
					"itemDescription": rows[0].itemDescription,
					"itemPrice": rows[0].itemPrice,
					"itemPhone": rows[0].itemPhone,
                    "itemAddress": rows[0].itemAddress,
                    "itemCity": rows[0].itemCity,
                    "itemState": rows[0].itemState,
                    "itemZip": rows[0].itemZip,
                    "itemLat": rows[0].itemLat,
                    "itemLong": rows[0].itemLong,
                    "categoryId": rows[0].categoryId,
					"categoryName": rows[0].categoryName,
					"author": rows[0].firstName + ' ' + rows[0].lastName,
					"authorPh": rows[0].userPhone,
					"authorEmail": rows[0].userEmail
				};
				context = item;	
			complete(context);
		}
		mysql.pool.query(itemQuery, id , returnItem);
	},

	saveItem: function(data, complete){
		const mysql = require('./dbcon');
		var updates = 'UPDATE `unqof373yoc7xedq`.`Items` ' + 
		'SET `itemName` = ?, ' +
		'`catID` = ?, '+
		'`itemDescription` = ?, '+
		'`itemPrice` = ?, '+
		'`itemAddress` = ?, ' +
		'`itemCity` = ?, ' +
		'`itemState` = ?, '+
		'`itemZip` = ?, '+
		'`itemLat` = ?, '+
		'`itemLong` = ? '+
		' WHERE `itemID` = ?; ';
		var values = [ data.itemName, data.catID, data.itemDescription, data.itemPrice, data.itemAddress, data.itemCity, data.itemState, data.itemZip, data.lat, data.long, data.itemID ];
		function saveUpdates(err, rows){
			if (err) {
				console.log(err);
			}
			complete();
		}

		mysql.pool.query(updates, values, saveUpdates);
	},

	getCategories: function(complete) {
		const mysql = require('./dbcon');
		var catQuery = 'SELECT * FROM unqof373yoc7xedq.Categories ';
		function returnCategories(err, rows, fields) {
			if (err) {
				console.log(err);
			}
			var context ={};
			var queryOut = [];
			for (var row in rows) {
				var categories = {
					"categoryId": rows[row].categoryId,
					"categoryName": rows[row].categoryName,
				};
				queryOut.push(categories);
			}
			context.data = queryOut;
			complete(queryOut);
		}
		mysql.pool.query(catQuery, returnCategories);
	},

};
module.exports.data = methods;

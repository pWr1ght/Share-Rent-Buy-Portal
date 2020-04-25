var methods = {

	getUsersItems: function(id, complete) {
		const mysql = require('./dbcon');
		var itemQuery = 'SELECT * FROM unqof373yoc7xedq.Items ' +
        'LEFT JOIN Categories c ON c.categoryId = Items.catID '+
        'WHERE Items.userID = ?;';
		function returnItems(err, rows, fields) {
			if (err) {
				console.log(err);
			}
			var queryOut = [];
			for (var row in rows) {
				var item = {
					id: rows[row].itemID,
					itemName: rows[row].itemName,
					itemDescription: rows[row].itemDescription,
					itemPrice: rows[row].itemPrice,
					itemPhone: rows[row].itemPhone,
                    itemAddress: rows[row].itemAddress,
                    itemCity: rows[row].itemCity,
                    itemState: rows[row].itemState,
                    itemZip: rows[row].itemZip,
                    itemLat: rows[row].itemLat,
                    itemLong: rows[row].itemLong,
                    categoryId: rows[row].categoryId,
                    categoryName: rows[row].categoryName
				};
				queryOut.push(item);
			}
			//console.log(queryOut);
			complete(JSON.stringify(queryOut));
		}
		mysql.pool.query(itemQuery, id , returnItems);
	},

};
module.exports.data = methods;

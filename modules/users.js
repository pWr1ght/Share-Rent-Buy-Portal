var methods = {
	// This function queries all users from the database.
	// Results are stringified into JSON and returned to the calling function
	getUsers: function(complete) {
		const mysql = require('./dbcon');
		var usersQuery = 'SELECT * FROM Users';
		function returnUsers(err, rows, fields) {
			if (err) {
				console.log(err);
			}
			var queryOut = [];
			for (var row in rows) {
				var item = {
					id: rows[row].userID,
					dateJoined: rows[row].dateJoined,
					email: rows[row].userEmail,
					password: rows[row].userPassword,
					name: rows[row].firstName + ' ' + rows[row].lastName,
					phone: rows[row].userPhone
				};
				queryOut.push(item);
			}
			//console.log(queryOut);
			complete(JSON.stringify(queryOut));
		}
		mysql.pool.query(usersQuery, returnUsers);
	},

	// This function receives input from the user registration form. It verifies that the user
	// does with the email does not exist yet. The user is then saved to the data base.
	// Registered user is stringified and returned to the calling function so it may be added
	// to the users as defined in the main.js.
	registerUser: async function(req, res, mysql, complete) {
		const bcrypt = require('bcrypt');

		// Hash the password
		var hashedPassword;
		try {
			hashedPassword = await bcrypt.hash(req.body.password, 10);
		} catch (error) {
			console.log(error);
		}
		// Ensure user with this email does not exist yet
		var validate = 'SELECT * FROM Users WHERE userEmail=?';
		var usrEmail = [ req.body.email ];

		function validateReq(err, rows) {
			if (err) {
				console.log(err);
				return;
			} else if (rows.length == 0) {
				var insert =
					'INSERT INTO Users (firstName, lastName, userPassword, userEmail, userPhone, userRole) VALUES (?, ?, ?, ?, ?, ?)';
				var values = [
					req.body.fname,
					req.body.lname,
					hashedPassword,
					req.body.email,
					req.body.phone,
					'Admin'
				];

				//Save user in DB
				function insertUser(err, result) {
					if (err) {
						console.log(JSON.stringify(err));
						res.end();
					}
					console.log(result);
					var getUsersQuery = 'SELECT * FROM Users WHERE userID = ? LIMIT 1';
					var val = [ result.insertId ]; // Id of user who was just saved to db
					mysql.pool.query(getUsersQuery, val, function(err, rows) {
						if (err) {
							console.log(JSON.stringify(err));
							res.end();
						}
						var item = {
							id: rows[0].userID,
							dateJoined: rows[0].dateJoined,
							email: rows[0].userEmail,
							password: rows[0].userPassword,
							name: rows[0].firstName + ' ' + rows[0].lastName,
							phone: rows[0].userPhone
						};
						// Return the new user to the calling function
						complete(item);
					});
				}
				mysql.pool.query(insert, values, insertUser);
			} else {
				//TODO: Let the user know that they tried to register with an email that already exists in DB
				console.log('User with this email already exists');
			}
		}
		mysql.pool.query(validate, usrEmail, validateReq);
	}
};
module.exports.data = methods;

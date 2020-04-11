var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',  //'classmysql.engr.oregonstate.edu',
  user            : 'root',
  password        : '',
  database        : ''
});
module.exports.pool = pool;
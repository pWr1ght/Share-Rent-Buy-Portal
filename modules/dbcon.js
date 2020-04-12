var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'i5x1cqhq5xbqtv00.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user            : 'sgz18z5s7a8lv7cp',
  password        : 'ffe9m9ngms4g67w0',
  port            : '3306',
  database        : 'unqof373yoc7xedq'
});
module.exports.pool = pool;
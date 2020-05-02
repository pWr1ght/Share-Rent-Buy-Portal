module.exports = function () {
    var express = require('express');
    var testItems = require('../modules/testPosts');
    const pool = require('../modules/dbcon').pool;
    var router = express.Router();
    
    // queries select item
    router.get('/', function(req, res) {
        var idName = req.id_label
        console.log(idName)
        var sql = 'SELECT * FROM Items Where itemID = ' + idName
        pool.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result)
            // res.send('you queried the database')
            res.render('displayItem', result[0]);
        })
    }); 
    return router;
}();
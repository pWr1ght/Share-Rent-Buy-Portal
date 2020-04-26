module.exports = function () {
    var express = require('express');
    var testItems = require('../modules/testPosts');
    var router = express.Router();

    /* This function extracts the current non-expired listings and renders the home page with the data.*/
    function serveHome(req, res, next) {
        var mysql = req.app.get('mysql');
        var mainQuery = 'SELECT * FROM items LIMIT 6';
        var context = {}
        
        if (req.isAuthenticated()) {
            context.auth = req.user.name;
        } 

        mysql.pool.query(mainQuery, function(err, rows, fields){
            if(err){
                context.status = err;
            }else{
                
                var items = [];
                for (var row in rows){
                    let item = {
                        "Id":rows[row].itemID,
                        "UserId":rows[row].userID,
                        "CategoryId":rows[row].catID,
                        "Title":rows[row].itemName,
                        "Descr":rows[row].itemDescription,
                        "Price":rows[row].itemPrice,
                        "Phone":rows[row].itemPhone,
                        "Address":rows[row].itemAddress,
                        "City":rows[row].itemCity,
                        "State":rows[row].itemState,
                        "ZipCode":rows[row].itemZip,
                        "Lat":rows[row].itemLat,
                        "Lon":rows[row].itemlong
                    };
                    items.push(item);
                }
                context.items = items;
            }
            
            res.render('home', context);    

        })
        
    }

    /* The routes for homepage */
    router.get('/', serveHome); 
    return router;
}();
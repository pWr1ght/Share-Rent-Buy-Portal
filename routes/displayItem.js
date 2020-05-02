// module.exports = function () {
//     var express = require('express');
//     var testItems = require('../modules/testPosts');
//     const pool = require('../modules/dbcon').pool;
//     var router = express.Router();

//     /* This function extracts the current non-expired listings and renders the home page with the data.*/
//     function serveHome(req, res, next) {
//         var mainQuery = 'SELECT * FROM Items ORDER BY itemID DESC LIMIT 12'
//         var context = {}
        
//         if (req.isAuthenticated()) {
//             context.auth = req.user;
//         } 

//         pool.query(mainQuery, function(err, rows, fields){
//             if(err){
//                 context.status = err;
//             }else{
                
//                 var items = [];
//                 for (var row in rows){
//                     let item = {
//                         "Id":rows[row].itemID,
//                         "UserId":rows[row].userID,
//                         "CategoryId":rows[row].catID,
//                         "Title":rows[row].itemName,
//                         "Descr":rows[row].itemDescription,
//                         "Price":rows[row].itemPrice,
//                         "Phone":rows[row].itemPhone,
//                         "Address":rows[row].itemAddress,
//                         "City":rows[row].itemCity,
//                         "State":rows[row].itemState,
//                         "ZipCode":rows[row].itemZip,
//                         "Lat":rows[row].itemLat,
//                         "Lon":rows[row].itemLong
//                     };
//                     items.push(item);
//                 }
//                 context.items = items;
//             }
//             app.use('/item/:id', function(req, res) {
// 	        res.render("displayItem");
//             });
//             // res.render('displayItem', context);    
//         })
        
//     }

//     /* The routes for homepage */
//     router.get('/item/:id', function(req, res) {
//         res.render("displayItem");
//     });
//     return router;
// }();

// var express = require('express');
// var testItems = require('../modules/testPosts');
// const pool = require('../modules/dbcon').pool;
// var router = express.Router();

// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res, next) => {
//     res.render('displayItem');
// //     var id = req.id_label;
// //   res.send( ' says ' + id);
// });

// module.exports = router;

module.exports = function () {
    var express = require('express');
    var testItems = require('../modules/testPosts');
    const pool = require('../modules/dbcon').pool;
    var router = express.Router();

    /* This function extracts the current non-expired listings and renders the home page with the data.*/
    function getItem(req, res, next) {
        console.log("hello")
        // // 'SELECT * FROM Items ORDER BY itemID DESC LIMIT 12';
        // // SELECT * FROM Items Where itemID = 13
        // var mainQuery = 'SELECT * FROM Items ORDER BY itemID DESC LIMIT 12';
        // console.log()
        // var context = {}
        
        // if (req.isAuthenticated()) {
        //     context.auth = req.user;
        // } 

        // pool.query(mainQuery, function(err, rows, fields){
        //     if(err){
        //         context.status = err;
        //     }else{
                
        //         var items = [];
        //         for (var row in rows){
        //             let item = {
        //                 "Id":rows[row].itemID,
        //                 "UserId":rows[row].userID,
        //                 "CategoryId":rows[row].catID,
        //                 "Title":rows[row].itemName,
        //                 "Descr":rows[row].itemDescription,
        //                 "Price":rows[row].itemPrice,
        //                 "Phone":rows[row].itemPhone,
        //                 "Address":rows[row].itemAddress,
        //                 "City":rows[row].itemCity,
        //                 "State":rows[row].itemState,
        //                 "ZipCode":rows[row].itemZip,
        //                 "Lat":rows[row].itemLat,
        //                 "Lon":rows[row].itemLong
        //             };
        //             items.push(item);
        //         }
        //         context.items = items;
        //     }
        //     console.log(context[1])
        //     res.render('displayItem', context[1]);    

        // })
        
    }

    /* The routes for homepage */
    // router.get('/', function() {
    //     getItem
    // }); 
    // return router;
    router.get('/', function(req, res) {
        let sql = 'SELECT * FROM Items Where itemID = 13'
        pool.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result)
            res.send('you queried the database')
        })
    }); 
    return router;
}();
module.exports = function () {
    var express = require('express');
    var testItems = require('../modules/testPosts');
    var router = express.Router();

    /* This function extracts the current non-expired listings and renders the home page with the data.*/
    function serveHome(req, res, next) {
        
        var context = {}
        context.items = {
            "cont": {"Id": "1",
            "CategoryId": "1",
            "UserId": "1",
            "Title": 'Bicycle for rent',
            "Descr": 'You can rent it',
            "Price": "25.36",
            "Phone": "7607896532",
            "PostDate": '2020-04-11',
            "ExpDate": '2020-05-25',
            "Address": "1550 Leucadia Blvd",
            "City": "Encinitas",
            "State": "CA",
            "ZipCode": "92024",
            "Lat": "33.0691844",
            "Lon":"-117.266312"
            },
            "cont2": {
            "Id": "2",
            "CategoryId": "1",
            "UserId": "1",
            "Title": 'Scooter for sale',
            "Descr": 'You can buy it',
            "Price": "35.15",
            "Phone": "7607896532",
            "PostDate": '2020-04-10',
            "ExpDate": '2020-06-25',
            "Address": "268 N El Camino Real",
            "City": "Encinitas",
            "State": "CA",
            "ZipCode": "92024",
            "Lat": "33.0523889",
            "Lon":"-117.2609424"
            }
        }
        res.render('home', context);    
    }

    /* The routes for homepage */
    router.get('/', serveHome); 
    return router;
}();
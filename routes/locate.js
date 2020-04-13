module.exports = function () {
    var express = require('express');``
    const fetch = require("node-fetch");
    const config = require('../keys.json');
    var router = express.Router();

    /* This function extracts the current non-expired listings and renders the home page with the data.*/
    function serveLocate(req, res, next) {
        
        var context = {}
        res.render('locate', context);
    }

    function getCoord(req, res, next) {
        const g_api = config.gmaps_key;
        var g_url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="
                    +req.body.userLat+","+req.body.userLon
                    +"&destinations="+req.body.destLat
                    +"%2C"+req.body.destLon
                    +"&key="+g_api

        var getData = async url => {
            try {
                var response = await fetch(url);
                var coord = await response.json();
                var dist1 = coord.rows[0].elements[0].distance.text;
                var dist2 = coord.rows[0].elements[0].distance.value;
                var dur1 = coord.rows[0].elements[0].duration.text;
                var dur2 = coord.rows[0].elements[0].duration.value;
                context = {
                    distText: dist1,
                    distVal: dist2,
                    durText: dur1,
                    durVal: dur2
                }
                res.send(JSON.stringify(context));
            } catch (error) {
                console.log(error);
            }
        };
        getData(g_url);
    }

    function getNearbyPl(){
        
        var url = "http://api.geonames.org/findNearbyPlaceNameJSON?lat=47.3&lng=9&username=cs361dq2020";
        var getData = async url => {
            try {
                var response = await fetch(url);
                var data = await response.json();

                context = {  }
                res.send(JSON.stringify(context));
            } catch (error) {
                console.log(error);
            }
        };
        getData(url);
    }

    /* The routes for homepage */
    router.get('/', serveLocate); 
    router.post('/', getCoord);
    router.post('/get-near-places', getNearbyPl);
    return router;
}();
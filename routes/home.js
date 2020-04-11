module.exports = function () {
    var express = require('express');
    var router = express.Router();

    /* This function extracts the current non-expired listings and renders the home page with the data.*/
    function serveHome(req, res, next) {
        
        var context={
            "resp": "Your home page"
        }
        res.render('home', context);

    }


    /* The routes for homepage */
    router.get('/', serveHome); 
    return router;
}();
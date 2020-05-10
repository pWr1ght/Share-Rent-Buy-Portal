module.exports = function () {
    const express = require('express');
    const get_set_items = require('../modules/items.js');
    const router = express.Router();
    const fetch = require('node-fetch');

	/* This function extracts the current non-expired listings and renders the home page with the data.*/
	function renderItems(req, res) {

        function setItems(data){
            if (req.isAuthenticated()) {
                data.auth = req.user;
            } 
            res.render('editItem', {data});
        }
		get_set_items.data.getUsersItems(req.user.id, setItems) ;
    }
    
    // Deletes a item by supplied id
    function removeItem(req, res){
        console.log("delete req " + req.body.id);
        const pool = require('../modules/dbcon').pool;
        const exists = 'SELECT * FROM Items WHERE itemID=? ';
        var value = [req.body.id];
        
        function deleteItem(err, rows, fields) {
			if (err) {
				console.log(err);
				return;
			} else if(rows.length == 1) {
                console.log(rows);
                // Delete it
                const deleteQuery = 'DELETE FROM Items WHERE itemID = ? ';
                pool.query(deleteQuery, value, (err, rows) => {
                    if(err){
                        console.log(err);
                        return;
                    } else {
                        function refreshItems(data){
                            res.send({data});
                        }
                        // Return refreshed items array
                        get_set_items.data.getUsersItems(req.user.id, refreshItems) ;
                    }
                })
            } else {
                return;
            }
            
        }
        // Ensure item exists before we delete it.
        pool.query(exists, value, deleteItem);
    }

    function editEditItem(req, res){

        function sendItem(item){
            res.send(item);
        }
        get_set_items.data.getItem(req.body.id, sendItem) ;
    }

    function getCats(req, res){
        function cats(data){
            res.send(data);
        }
        get_set_items.data.getCategories( cats ) ;
    }

    async function saveItem(req, res){
        if (!req.user) {
            console.log('User not logged in');
            var message = 'User not logged in';
            res.redirect('/login', message);
        } else {
            var saveItem = {
                itemID: req.body.itemID,
                catID: req.body.catID,
                itemName: req.body.itemName,
                itemDescription: req.body.itemDescription,
                itemPrice: req.body.itemPrice,
                itemAddress: req.body.itemAddress,
                itemCity: req.body.itemCity,
                itemState: req.body.itemState,
                itemZip: req.body.itemZip
            }

            var addressString = req.body.itemAddress + ', ' + req.body.itemCity + ', ' + req.body.itemState;
            addressString = addressString.replace(/\s/g, '+');
            
            await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${process.env.GOOGLE_API_KEY}`)
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    lat = data.results[0].geometry.location.lat;
                    long = data.results[0].geometry.location.lng;
                })
                .catch((err) => res.status(500).send({ error: { err } }));
            try {
                saveItem.lat = lat;
                saveItem.long = long;
                get_set_items.data.saveItem(saveItem, () => {
                    res.send("Item Saved");
                });
            } catch (err) {
                res.status(500).send({ error: err });
            }
        }
    }

    router.delete('/', removeItem);
    router.post('/id', editEditItem);
    router.post('/save', saveItem);
    router.get('/cats', getCats);
    router.get('/', renderItems);
    
	return router; //Branch test II
}();
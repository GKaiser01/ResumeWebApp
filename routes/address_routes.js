var express = require('express');
var router = express.Router();
var address = require('../model/address');


// View All addresses
router.get('/all', function(req, res) {
    address.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('address/addressViewAll', { 'result':result });
        }
    });

});

// View the address for the given id
router.get('/', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address.getById(req.query.address_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('address/addressViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('address/addressAdd', {'address': result});
        }
    });
});


router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.street == null) {
        res.send('The address street name must be provided.');
    }
    if(req.query.zip_code == null) {
        res.send('The zip code must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        address.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/address/all');
            }
        });
    }
});


// Delete a address for the given address_id
router.get('/delete', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address.delete(
            req.query.address_id,
            function(err, result){
                if(err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/address/all');
                }
            }
        );
    }
});

module.exports = router;
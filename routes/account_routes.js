var express = require('express');
var router = express.Router();
var account = require('../model/account');


// View All accounts
router.get('/all', function(req, res) {
    account.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('account/accountViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account.getById(req.query.account_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('account/accountViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    account.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('account/accountAdd', {'account': result});
        }
    });
});

router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.first_name == null) {
        res.send('A first name must be provided.');
    }
    else if(req.query.last_name == null) {
        res.send('A last name must be provided');
    }
    if(req.query.email == null) {
        res.send('An e-mail must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        account.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});


// Delete a account for the given account_id
router.get('/delete', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account.delete(
            req.query.account_id,
            function(err, result){
                if(err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/account/all');
                }
            }
        );
    }
});

module.exports = router;
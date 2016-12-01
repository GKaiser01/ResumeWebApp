var express = require('express');
var router = express.Router();
var company = require('../model/company');


// View All Companies
router.get('/all', function(req, res) {
    company.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('company/companyViewAll', { 'result':result });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.company_id == null) {
        res.send('company_id is null');
    }
    else {
        company.getById(req.query.company_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('company/companyViewById', {'result': result});
            }
        });
    }
});

module.exports = router;
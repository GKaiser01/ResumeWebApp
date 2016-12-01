var express = require('express');
var router = express.Router();
var school = require('../model/school');


// View All schools
router.get('/all', function(req, res) {
    school.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('school/schoolViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.school_id == null) {
        res.send('school_id is null');
    }
    else {
        school.getById(req.query.school_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('school/schoolViewById', {'result': result});
           }
        });
    }
});

module.exports = router;

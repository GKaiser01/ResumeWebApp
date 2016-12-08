var express = require('express');
var router = express.Router();
var resume = require('../model/resume');
var account = require('../model/account');

// View All resumes
router.get('/all', function(req, res) {
    resume.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeViewAll', { 'result':result });
        }
    });

});

// View the resume for the given id
router.get('/', function(req, res){
    if(req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume.getById(req.query.resume_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('resume/resumeViewById', {'result': result});
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
            res.render('resume/resumeAdd', {'account': result});
        }
    });
});


router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.resume_name == null) {
        res.send('Resume name must be provided.');
    }
    else if(req.query.account_id == null) {
        res.send('An account must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        resume.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/resume/all');
            }
        });
    }
});


// Delete a resume for the given resume_id
router.get('/delete', function(req, res){
    if(req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume.delete(
            req.query.resume_id,
            function(err, result){
                if(err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/resume/all');
                }
            }
        );
    }
});

module.exports = router;
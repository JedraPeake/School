var express = require('express');
var router = express.Router();
var AssessmentTests = require('../models/assessment-tests');
router.route('/')
    .post(function (request, response) {
        var assessmentTest = new AssessmentTests.Model(request.body.assessmentTest);
        assessmentTest.save(function (error) {
            if (error) response.send(error);
            response.json({assessmentTest: assessmentTest});
        });
    })
    .get(function (request, response) {
        var Rehabilitation=request.query.filter;
        if(!Rehabilitation){
             AssessmentTests.Model.find(function (error, assessmentTest) {
            if (error) response.send(error);
            response.json({assessmentTest: assessmentTest});
        });
        }else{
        AssessmentTests.Model.find({'rehabilitations':Rehabilitation.rehabilitations},function (error, assessmentTest) {
            if (error) response.send(error);
            response.json({assessmentTest: assessmentTest});
        });
        }
    });

router.route('/:assessmentTest_id')
    .get(function (request, response) {
        AssessmentTests.Model.findById(request.params.assessmentTest_id, function (error, assessmentTest) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({assessmentTest: assessmentTest});
            }
        });
    })
    .put(function (request, response) {
        AssessmentTests.Model.findById(request.params.assessmentTest_id, function (error, assessmentTest) {
            if (error) {
                response.send({error: error});
            }
            else {
                assessmentTest.name = request.body.assessmentTest.name;
                assessmentTest.description = request.body.assessmentTest.description;
                assessmentTest.authorName=request.body.assessmentTest.authorName;
                assessmentTest.forms=request.body.assessmentTest.forms;
                assessmentTest.testResult=request.body.assessmentTest.testResult;
                assessmentTest.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({assessmentTest: assessmentTest});
                    }
                });
            }
        });
    })
        .patch(function (request, response) {
        AssessmentTests.Model.findById(request.params.assessmentTest_id, function (error, assessmentTest) {
            if (error) {
                response.send({error: error});
            }
            else {
                assessmentTest.name = request.body.assessmentTest.name;
                assessmentTest.description = request.body.assessmentTest.description;
                assessmentTest.authorName=request.body.assessmentTest.authorName;
                assessmentTest.forms=request.body.assessmentTest.forms;
                assessmentTest.testResult=request.body.assessmentTest.testResult;
                assessmentTest.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({assessmentTest: assessmentTest});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        AssessmentTests.Model.findByIdAndRemove(request.params.assessmentTest_id,
            function (error, deleted) {
                if (!error) {
                    response.json({assessmentTest: deleted});
                }
            }
        );
    });
module.exports = router;
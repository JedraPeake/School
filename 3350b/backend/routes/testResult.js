var express = require('express');
var router = express.Router();
var TestResults = require('../models/test-result');
router.route('/')
    .post(function (request, response) {
        var testResult = new TestResults.Model(request.body.testResult);
        testResult.save(function (error) {
            if (error) response.send(error);
            response.json({testResult: testResult});
        });
    })
    .get(function (request, response) {
        var IntroForm=request.query.filter;
        if(!IntroForm){
             TestResults.Model.find(function (error, testResult) {
            if (error) response.send(error);
            response.json({testResult: testResult});
        });
        }
        else{
            TestResults.Model.find({'introForm':IntroForm.introForm}, function (error,testResult){
                if(error) response.send(error);
                response.json({testResult:testResult});
            });
        }
    });
    
    /* .get(function (request, response) {
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
    });*/

router.route('/:testResult_id')
    .get(function (request, response) {
        TestResults.Model.findById(request.params.testResult_id, function (error, testResult) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({testResult: testResult});
            }
        });
    })
    .put(function (request, response) {
        TestResults.Model.findById(request.params.testResult_id, function (error, testResult) {
            if (error) {
                response.send({error: error});
            }
            else {
                testResult.name = request.body.testResult.name;
                testResult.description = request.body.testResult.description;
                testResult.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({testResult: testResult});
                    }
                });
            }
        });
    })
    .patch(function (request, response) {
        TestResults.Model.findById(request.params.testResult_id, function (error, testResult) {
            if (error) {
                response.send({error: error});
            }
            else {
                testResult.name = request.body.testResult.name;
                testResult.description = request.body.testResult.description;
                testResult.answer=request.body.testResult.answer;
                testResult.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({testResult: testResult});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        TestResults.Model.findByIdAndRemove(request.params.testResult_id,
            function (error, deleted) {
                if (!error) {
                    response.json({testResult: deleted});
                }
            }
        );
    });
module.exports = router;
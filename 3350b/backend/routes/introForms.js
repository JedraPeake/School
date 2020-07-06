var express = require('express');
var router = express.Router();
var IntroForms = require('../models/intro-forms');
router.route('/')
    .post(function (request, response) {
        var introForm = new IntroForms.Model(request.body.introForm);
        introForm.save(function (error) {
            if (error) response.send(error);
            response.json({introForm: introForm});
        });
    })
    .get(function (request, response) {
        
             IntroForms.Model.find(function (error, introForm) {
            if (error) response.send(error);
            response.json({introForm: introForm});
        });
        
    });

router.route('/:introForm_id')
    .get(function (request, response) {
        IntroForms.Model.findById(request.params.introForm_id, function (error, introForm) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({introForm: introForm});
            }
        });
    })
    .put(function (request, response) {
        IntroForms.Model.findById(request.params.introForm_id, function (error, introForm) {
            if (error) {
                response.send({error: error});
            }
            else {
                introForm.name = request.body.introForm.name;
                introForm.description = request.body.introForm.description;
                introForm.authorName=request.body.introForm.authorName;
                introForm.forms=request.body.introForm.forms;
                introForm.testResult=request.body.introForm.testResult;
                introForm.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({introForm: introForm});
                    }
                });
            }
        });
    })
        .patch(function (request, response) {
        IntroForms.Model.findById(request.params.introForm_id, function (error, introForm) {
            if (error) {
                response.send({error: error});
            }
            else {
                introForm.name = request.body.introForm.name;
                introForm.description = request.body.introForm.description;
                introForm.authorName=request.body.introForm.authorName;
                introForm.forms=request.body.introForm.forms;
                introForm.testResult=request.body.introForm.testResult;
                introForm.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({introForm: introForm});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        IntroForms.Model.findByIdAndRemove(request.params.introForm_id,
            function (error, deleted) {
                if (!error) {
                    response.json({introForm: deleted});
                }
            }
        );
    });
module.exports = router;
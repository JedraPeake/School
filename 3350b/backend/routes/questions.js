var express = require('express');
var router = express.Router();
var Questions = require('../models/questions');
router.route('/')
    .post(function (request, response) {
        var question = new Questions.Model(request.body.question);
        question.save(function (error) {
            if (error) response.send(error);
            response.json({question: question});
        });
    })
    .get(function (request, response) {
             Questions.Model.find(function (error, questions) {
            if (error) response.send(error);
            response.json({question: questions});
        }).sort({order:1});
        
       
    });

router.route('/:question_id')
    .get(function (request, response) {
        Questions.Model.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({question: question});
            }
        });
    })
    .put(function (request, response) {
        Questions.Model.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.send({error: error});
            }
            else {
                question.questionText = request.body.question.questionText;
                question.helpDescription = request.body.question.helpDescription;
                question.order = request.body.question.order;
                question.questionType=request.body.question.questionType;
                question.forms=request.body.question.forms;
                question.isWritten=request.body.question.isWritten;
                 question.isAgree=request.body.question.isAgree;
                  question.isMultiple=request.body.question.isMultiple;
                   question.isYes=request.body.question.isYes;
                question.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({question: question});
                    }
                });
            }
        });
    })
      .patch(function (request, response) {
        Questions.Model.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.send({error: error});
            }
            else {
                question.questionText = request.body.question.questionText;
                question.helpDescription = request.body.question.helpDescription;
                question.order = request.body.question.order;
                question.type=request.body.question.type;
                question.forms=request.body.question.forms;
                question.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({question: question});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        Questions.Model.findByIdAndRemove(request.params.question_id,
            function (error, deleted) {
                if(error){
                    console.log(error);
                }
                if (!error) {
                    response.json({question: deleted});
                }
            }
        );
    });
module.exports = router;
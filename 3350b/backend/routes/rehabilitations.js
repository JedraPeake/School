var express = require('express');
var router = express.Router();
var Rehabilitations = require('../models/rehabilitations');

router.route('/')
    .post(function (request, response) {
        var rehabilitation = new Rehabilitations.Model(request.body.rehabilitation);
        rehabilitation.save(function (error) {
            if (error) response.send(error);
            response.json({rehabilitation: rehabilitation});
        });

    })
    
    .get(function (request, response) {
        Rehabilitations.Model.find(function (error, rehabilitations) {
            if (error) response.send(error);
            response.json({rehabilitation: rehabilitations});
        });
    });

router.route('/:rehabilitation_id')
    .get(function (request, response) {
        Rehabilitations.Model.findById(request.params.rehabilitation_id, function (error, rehabilitation) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({rehabilitation: rehabilitation});
            }
        });
    })

    .put(function (request, response) {
        Rehabilitations.Model.findById(request.params.rehabilitation_id, function (error, rehabilitation) {
            if (error) {
                response.send({error: error});
            }
            else {
                rehabilitation.name = request.body.rehabilitation.name;
                rehabilitation.description = request.body.rehabilitation.description;
                rehabilitation.authorName = request.body.rehabilitation.authorName;
                rehabilitation.goal = request.body.rehabilitation.goal;
                rehabilitation.timeFrameToComplete = request.body.rehabilitation.timeFrameToComplete;
                
                rehabilitation.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({rehabilitation: rehabilitation});
                    }
                });
            }
        });
    })
    
    .patch(function (request, response) {
        Rehabilitations.Model.findById(request.params.rehabilitation_id, function (error, rehabilitation) {
            if (error) {
                response.send({error: error});
            }
            else {
                rehabilitation.name = request.body.rehabilitation.name;
                rehabilitation.description = request.body.rehabilitation.description;
                rehabilitation.authorName = request.body.rehabilitation.authorName;
                rehabilitation.goal = request.body.rehabilitation.goal;
                rehabilitation.timeFrameToComplete = request.body.rehabilitation.timeFrameToComplete;
                rehabilitation.assessmentTests=request.body.rehabilitation.assessmentTests;
                
                rehabilitation.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({rehabilitation: rehabilitation});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Rehabilitations.Model.findByIdAndRemove(request.params.rehabilitation_id,
            function (error, deleted) {
                if (!error) {
                    response.json({rehabilitation: deleted});
                }
            }
        );
    });
    
    

module.exports = router;

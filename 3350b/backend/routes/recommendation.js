var express = require('express');
var router = express.Router();
var Recommendations = require('../models/recommendation');
router.route('/')
    .post(function (request, response) {
        var recommendation = new Recommendations.Model(request.body.recommendation);
        recommendation.save(function (error) {
            if (error) response.send(error);
            response.json({recommendation: recommendation});
        });
    })
    .get(function (request, response) {
        Recommendations.Model.find(function (error, recommendation) {
            if (error) response.send(error);
            response.json({recommendation: recommendation});
        });
    });

router.route('/:recommendations_id')
    .get(function (request, response) {
        Recommendations.Model.findById(request.params.recommendations_id, function (error, recommendation) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({recommendation: recommendation});
            }
        });
    })
    .put(function (request, response) {
        Recommendations.Model.findById(request.params.recommendations_id, function (error, recommendation) {
            if (error) {
                response.send({error: error});
            }
            else {
                recommendation.timeStamp = request.body.recommendation.timeStamp;
                recommendation.description = request.body.recommendation.description;

                recommendation.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({recommendation: recommendation});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        Recommendations.Model.findByIdAndRemove(request.params.recommendations_id,
            function (error, deleted) {
                if (!error) {
                    response.json({recommendation: deleted});
                }
            }
        );
    });
module.exports = router;
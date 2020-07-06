var express = require('express');
var router = express.Router();
var RehabilitationPlans = require('../models/rehabilitation-plans');

router.route('/')
    // .post(function (request, response) {
    //     var rehabilitationPlan = new RehabilitationPlans.Model(request.body.rehabilitationPlan);
    //     rehabilitationPlan.save(function (error) {
    //         if (error) response.send(error);
    //         response.json({rehabilitationPlan: rehabilitationPlan});
    //     });
    // })
    
    .post(function (request, response) {
        var rehabilitationPlan = new RehabilitationPlans.Model(request.body.rehabilitationPlan);
        rehabilitationPlan.save(function (error) {
            if (error) response.send(error);
            response.json({rehabilitationPlan: rehabilitationPlan});
        });
    })
    
    
    // .get(function (request, response) {
    //     RehabilitationPlans.Model.find(function (error, rehabilitationPlans) {
    //         if (error) response.send(error);
    //         response.json({rehabilitationPlan: rehabilitationPlans});
    //     });
    // });
    .get(function (request, response) {
        var Post = request.query.post;
        if (!Post) {
            RehabilitationPlans.Model.find(function (error, rehabilitationPlan) {
                if (error) response.send(error);
                response.json({rehabilitationPlan: rehabilitationPlan});
            });
        } else {
            RehabilitationPlans.Model.find({"rehabilitationPlan": request.query.rehabilitationPlan}, function (error, rehabilitationPlan) {
                if (error) response.send(error);
                response.json({rehabilitationPlan: rehabilitationPlan});
            });
        }
    });

router.route('/:rehabilitationPlan_name')
    .get(function (request, response) {
        RehabilitationPlans.Model.findById(request.params.rehabilitationPlan_name, function (error, rehabilitationPlan) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({rehabilitationPlan: rehabilitationPlan});
            }
        });
    })
    .put(function (request, response) {
        RehabilitationPlans.Model.findById(request.params.rehabilitationPlan_name, function (error, rehabilitationPlan) {
            if (error) {
                response.send(error);
            }
            else {
                rehabilitationPlan.statement = request.body.rehabilitationPlan.statement; // update rehab plan
                rehabilitationPlan.save(function (error) { // save plan
                    if (error) {
                        response.send(error);
                    } else {
                        response.status(201).json({rehabilitationPlan: rehabilitationPlan});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        RehabilitationPlans.Model.findByIdAndRemove(request.params.rehabilitationPlan_name,
            function (error, deleted) {
                if (!error) {
                    response.json({rehabilitationPlan: deleted});
                }
            }
        );
    });

router.route('/:rehabilitationPlan_authorName')
    .get(function (request, response) {
        RehabilitationPlans.Model.findById(request.params.rehabilitationPlan_authorName, function (error, rehabilitationPlan) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({rehabilitationPlan: rehabilitationPlan});
            }
        });
    })
    .put(function (request, response) {
        RehabilitationPlans.Model.findById(request.params.rehabilitationPlan_authorName, function (error, rehabilitationPlan) {
            if (error) {
                response.send(error);
            }
            else {
                rehabilitationPlan.statement = request.body.rehabilitationPlan.statement; // update rehab plan
                rehabilitationPlan.save(function (error) { // save plan
                    if (error) {
                        response.send(error);
                    } else {
                        response.status(201).json({rehabilitationPlan: rehabilitationPlan});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        RehabilitationPlans.Model.findByIdAndRemove(request.params.rehabilitationPlan_authorName,
            function (error, deleted) {
                if (!error) {
                    response.json({rehabilitationPlan: deleted});
                }
            }
        );
    });

module.exports = router;


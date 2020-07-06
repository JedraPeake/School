var express = require('express');
var router = express.Router();
var Treatments = require('../models/treatments');

//may have to change get function
//all treatments
router.route('/')

    .post(function (request, response) {
        var treatment = new Treatments.Model(request.body.treatment);
        treatment.save(function (error) {
            if (error) response.send(error);
            response.json({treatment: treatment});
        });
    })

    .get(function (request, response) {
        var Client = request.query.filter;
        console.log(request.query.filter);
        if(!Client){
            Treatments.Model.find(function (error, treatments) {
                if (error) response.send(error);
                response.json({treatment: treatments});
            });
        } else {
            Treatments.Model.find({"client": Client.client}, function (error, treatments) {
                if (error) response.send(error);
                response.json({treatment: treatments});
            });
        }
        
    });


//treatments by assigned date
router.route('/:treatment_id')
    .get(function (request, response) {
        Treatments.Model.findById(request.params.treatment_id, function (error, treatment) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({treatment: treatment});
            }
        });
    })
    .put(function (request, response) {
        Treatments.Model.findById(request.params.treatment_id, function (error, treatment) {
            if (error) {
                response.send({error: error});
            }
            else {
                treatment.dateAssign = request.body.treatment.dateAssign;
                treatment.client = request.body.treatment.client;
                treatment.physiotherapist = request.body.treatment.physiotherapist;
                treatment.rehabilitation = request.body.treatment.rehabilitation;
                treatment.recommendations = request.body.treatment.recommendations;
                
                treatment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({treatment: treatment});
                    }
                });
            }
        });
    })
    
    .patch(function (request, response) {
        Treatments.Model.findById(request.params.treatment_id, function (error, treatment) {
            if (error) {
                response.send({error: error});
            }
            else {
                treatment.dateAssign = request.body.treatment.dateAssign;
                treatment.client = request.body.treatment.client;
                treatment.physiotherapist = request.body.treatment.physiotherapist;
                treatment.rehabilitation = request.body.treatment.rehabilitation;
                treatment.recommendations = request.body.treatment.recommendations;
        
                treatment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({treatment: treatment});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Treatments.Model.findByIdAndRemove(request.params.treatment_id,
            function (error, deleted) {
                if (!error) {
                    response.json({treatment: deleted});
                }
            }
        );
    });

module.exports = router;
var express = require('express');
var router = express.Router();
var PatientCountries = require('../models/patient-country');

router.route('/')
    .post(function (request, response) {
        var patientCountry = new PatientCountries.Model(request.body.patientCountry);
        patientCountry.save(function (error) {
            if (error) response.send(error);
            response.json({patientCountry: patientCountry});
        });
    })

    .get(function (request, response) {
        PatientCountries.Model.find(function (error, patientCountries) {
            if (error) response.send(error);
            response.json({patientCountry: patientCountries});
        });
    });

router.route('/:patientCountry_id')
    .get(function (request, response) {
        PatientCountries.Model.findById(request.params.patientCountry_id, function (error, patientCountry) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({patientCountry: patientCountry});
            }
        });
    })

    .put(function (request, response) {
        PatientCountries.Model.findById(request.params.patientCountry_id, function (error, patientCountry) {
            if (error) {
                response.send({error: error});
            }
            else {
                patientCountry.name = request.body.patientCountry.name;

                patientCountry.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({patientCountry: patientCountry});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        PatientCountries.Model.findByIdAndRemove(request.params.patientCountry_id,
            function (error, deleted) {
                if (!error) {
                    response.json({patientCountry: deleted});
                }
            }
        );
    });

module.exports = router;
var express = require('express');
var router = express.Router();
var PatientProfiles = require('../models/patient-profile');

router.route('/')
    .post(function (request, response) {
        var patientProfile = new PatientProfiles.Model();
        patientProfile.familyName = request.body.familyName;
        patientProfile.givenName = request.body.givenName;
        patientProfile.DOB = request.body.DOB;
        patientProfile.postalCode = request.body.postalCode;
        patientProfile.phone = request.body.phone;
        patientProfile.martialStatus = request.body.martialStatus;
        patientProfile.healthCadNumber = request.body.healthCadNumber;
        patientProfile.occupation = request.body.occupation;
        patientProfile.others = request.body.others;
        patientProfile.save(function (error) {
            if (error) response.send(error);
            response.json({patientProfile: patientProfile});
        });
    })

    .get(function (request, response) {
        PatientProfiles.Model.find(function (error, patientProfiles) {
            if (error) response.send(error);
            response.json({patientProfile: patientProfiles});
        });
    });

router.route('/:patientProfile_id')
    .get(function (request, response) {
        PatientProfiles.Model.findById(request.params.patientProfile_id, function (error, patientProfile) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({patientProfile: patientProfile});
            }
        });
    })

    .put(function (request, response) {
        PatientProfiles.Model.findById(request.params.patientProfile_id, function (error, patientProfile) {
            if (error) {
                response.send({error: error});
            }
            else {
                patientProfile.DOB = request.body.patientProfile.DOB;
                patientProfile.postalCode = request.body.patientProfile.postalCode;
                patientProfile.phone = request.body.patientProfile.phone;
                patientProfile.martialStatus = request.body.patientProfile.martialStatus;
                patientProfile.healthCadNumber = request.body.patientProfile.healthCadNumber;
                patientProfile.occupation = request.body.patientProfile.occupation;
                patientProfile.others = request.body.patientProfile.others;

                patientProfile.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({patientProfile: patientProfile});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        PatientProfiles.Model.findByIdAndRemove(request.params.patientProfile_id,
            function (error, deleted) {
                if (!error) {
                    response.json({patientProfile: deleted});
                }
            }
        );
    });

module.exports = router;
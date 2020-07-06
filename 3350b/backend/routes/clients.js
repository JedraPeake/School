var express = require('express');
var router = express.Router();
var Clients = require('../models/clients');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    
    .post(function (request, response) {
        //request.body = {}
        // request.body.exercise = undefined
        
        var client = new Clients.Model(request.body.client);
        client.save(function (error) {
            if (error) response.send(error);
            response.json({client: client});
        });


    })

    .get(function (request, response) {
        Clients.Model.find(function (error, clients) {
            if (error) response.send(error);
            response.json({client: clients});
        }).sort({givenName:1}) ;
    });

router.route('/:client_id')
    .get(function (request, response) {
        Clients.Model.findById(request.params.client_id, function (error, client) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({client: client});
            }
        });
    })

    .put(function (request, response) {
        Clients.Model.findById(request.params.client_id, function (error, client) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                client.familyName = request.body.client.familyName;
                client.givenName = request.body.client.givenName;
                client.email = request.body.client.email;
                client.DOB = request.body.client.DOB;
                client.age = request.body.client.age;
                client.postalCode = request.body.client.postalCode;
                client.phone = request.body.client.phone;
                client.martialStatus = request.body.client.martialStatus;
                client.healthCadNumber = request.body.client.healthCadNumber;
                client.occupation = request.body.client.occupation;
                client.others = request.body.client.others;
                client.enabled = request.body.client.enabled; // added
                client.userShadow = request.body.client.userAccount; // added
                client.userRoles = request.body.client.userRoles; // added
                client.payments = request.body.client.payments;
                client.appointments = request.body.client.appointments;
                client.gender = request.body.client.gender;
                client.city = request.body.client.city;
                client.province = request.body.client.province;
                client.patientCountry = request.body.client.patientCountry;
                client.treatments = request.body.client.treatments;
                client.userAccount = request.body.client.userAccount;
                

                client.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({client: client});
                        // console.log(client);

                    }
                });
            }
        });
    })
    
    .patch(function (request, response) {
        Clients.Model.findById(request.params.client_id, function (error, client) {
            if (error) {
                response.send({error: error});
            }
            else {
                client.familyName = request.body.client.familyName;
                client.givenName = request.body.client.givenName;
                client.email = request.body.client.email;
                client.DOB = request.body.client.DOB;
                client.age = request.body.client.age;
                client.postalCode = request.body.client.postalCode;
                client.phone = request.body.client.phone;
                client.martialStatus = request.body.client.martialStatus;
                client.healthCadNumber = request.body.client.healthCadNumber;
                client.occupation = request.body.client.occupation;
                client.others = request.body.client.others;
                client.enabled = request.body.client.enabled; // added
                client.userShadow = request.body.client.userAccount; // added
                client.userRoles = request.body.client.userRoles; // added
                client.payments = request.body.client.payments;
                client.appointments = request.body.client.appointments;
                client.gender = request.body.client.gender;
                client.city = request.body.client.city;
                client.province = request.body.client.province;
                client.patientCountry = request.body.client.patientCountry;
                client.treatments = request.body.client.treatments;
                client.userAccount = request.body.client.userAccount;
                client.notes = request.body.client.notes;
                client.introForm = request.body.client.introForm;
                

                client.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({client: client});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Clients.Model.findByIdAndRemove(request.params.client_id,
            function (error, deleted) {
                if (!error) {
                    response.json({client: deleted});
                }
            }
        );
    });

module.exports = router;
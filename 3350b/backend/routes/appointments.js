var express = require('express');
var router = express.Router();
var Appointments = require('../models/appointments');

router.route('/')
    .post(function (request, response) {
        
        var appointment = new Appointments.Model(request.body.appointment);
        console.log(appointment);
        appointment.save(function (error) {
            if (error) response.send(error);
            response.json({appointment: appointment});
        });
    })

    .get(function (request, response) {
        var StartsAt = request.query.filter;
        if(!StartsAt){
            Appointments.Model.find(function (error, appointments) {
                if (error) response.send(error);
                response.json({appointment: appointments});
            });
        } else {
            Appointments.Model.find({"startsAt": StartsAt.startsAt}, function (error, appointments) {
                if (error) response.send(error);
                response.json({appointment: appointments});
            });
        }
        
        // Appointments.Model.find(function (error, appointments) {
        //     if (error) response.send(error);
        //     response.json({appointment: appointments});
        // });
    });

router.route('/:appointment_id')
    .get(function (request, response) {
        
        Appointments.Model.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({appointment: appointment});
            }
        });
    })

    .put(function (request, response) {
        Appointments.Model.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
                response.send({error: error});
            }
            else {
                // appointment.date = request.body.appointment.date;
                //appointment.reason = request.body.appointment.reason;
                appointment.available = request.body.appointment.available;
                appointment.startsAt = request.body.appointment.startsAt;
                appointment.endsAt = request.body.appointment.endsAt;
                appointment.clientID = request.body.appointment.clientID;
                appointment.client = request.body.appointment.client;


                appointment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({appointment: appointment});
                    }
                });
            }
        });
    })
    
    .patch(function (request, response) {
        Appointments.Model.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
                response.send({error: error});
            }
            else {
                // appointment.date = request.body.appointment.date;
                //appointment.reason = request.body.appointment.reason;
                appointment.available = request.body.appointment.available;
                appointment.startsAt = request.body.appointment.startsAt;
                appointment.endsAt = request.body.appointment.endsAt;
                appointment.clientID = request.body.appointment.clientID;
                appointment.client = request.body.appointment.client;
                
                
                appointment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({appointment: appointment});
                    }
                });
            }
        });
    })


    .delete(function (request, response) {
        Appointments.Model.findByIdAndRemove(request.params.appointment_id,
            function (error, deleted) {
                if (!error) {
                    response.json({appointment: deleted});
                }
            }
        );
    });

module.exports = router;
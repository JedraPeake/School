var express = require('express');
var router = express.Router();
var Payments = require('../models/payments');

router.route('/')
    .post(function (request, response) {
        var payment = new Payments.Model(request.body.payment);
        payment.save(function (error) {
            if (error) response.send(error);
            response.json({payment: payment});
        });
    })

    .get(function (request, response) {
        var Client = request.query.filter;
        if(!Client){
            Payments.Model.find(function (error, payment) {
                if (error) response.send(error);
                response.json({payment: payment});
            });
        } else {
            Payments.Model.find({"client": Client.client}, function (error, payment) {
                if (error) response.send(error);
                response.json({payment: payment});
            });
        }
        // Payments.Model.find(function (error, payments) {
        //     if (error) response.send(error);
        //     response.json({payment: payments});
        // });
    });

router.route('/:payment_id')
    .get(function (request, response) {
        Payments.Model.findById(request.params.payment_id, function (error, payment) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({payment: payment});
            }
        });
    })

    .put(function (request, response) {
        Payments.Model.findById(request.params.payment_id, function (error, payment) {
            if (error) {
                response.send({error: error});
            }
            else {
                payment.dayTimeStamp = request.body.payment.dayTimeStamp;
                payment.note = request.body.payment.note;
                payment.threefifty = request.body.payment.threefifty;
                payment.onefifty= request.body.payment.onefifty;
                payment.seventyfive = request.body.payment.seventyfive;
                payment.fivefifty = request.body.payment.fivefifty;
                payment.client = request.body.payment.client;
                

                payment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({payment: payment});
                    }
                });
            }
        });
    })
    
        .patch(function (request, response) {
        Payments.Model.findById(request.params.payment_id, function (error, payment) {
            if (error) {
                response.send({error: error});
            }
            else {
                payment.dayTimeStamp = request.body.payment.dayTimeStamp;
                payment.note = request.body.payment.note;
                payment.threefifty = request.body.payment.threefifty;
                payment.onefifty= request.body.payment.onefifty;
                payment.seventyfive = request.body.payment.seventyfive;
                payment.fivefifty = request.body.payment.fivefifty;
                payment.client = request.body.payment.client;
                
                
                payment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({payment: payment});
                    }
                });
            }
        });
    })
    

    .delete(function (request, response) {
        Payments.Model.findByIdAndRemove(request.params.payment_id,
            function (error, deleted) {
                if (!error) {
                    response.json({payment: deleted});
                }
            }
        );
    });

module.exports = router;
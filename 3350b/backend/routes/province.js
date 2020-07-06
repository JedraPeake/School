var express = require('express');
var router = express.Router();
var Provinces = require('../models/province');

router.route('/')
    .post(function (request, response) {
        var province = new Provinces.Model(request.body.province);
        province.save(function (error) {
            if (error) response.send(error);
            response.json({province: province});
        });
    })

    .get(function (request, response) {
        Provinces.Model.find(function (error, provinces) {
            if (error) response.send(error);
            response.json({province: provinces});
        });
    });

router.route('/:province_id')
    .get(function (request, response) {
        Provinces.Model.findById(request.params.appointment_id, function (error, province) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({province: province});
            }
        });
    })

    .put(function (request, response) {
        Provinces.Model.findById(request.params.appointment_id, function (error, province) {
            if (error) {
                response.send({error: error});
            }
            else {
                province.name = request.body.province.name;

                province.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({province: province});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Provinces.Model.findByIdAndRemove(request.params.province_id,
            function (error, deleted) {
                if (!error) {
                    response.json({province: deleted});
                }
            }
        );
    });

module.exports = router;
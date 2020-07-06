var express = require('express');
var router = express.Router();
var Types = require('../models/types');
router.route('/')
    .post(function (request, response) {
        var type = new Types.Model(request.body.type);
        type.save(function (error) {
            if (error) response.send(error);
            response.json({type: type});
        });
    })
    .get(function (request, response) {
        Types.Model.find(function (error, types) {
            if (error) response.send(error);
            response.json({type: types});
        });
    });

router.route('/:type_id')
    .get(function (request, response) {
        Types.Model.findById(request.params.type_id, function (error, type) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({type: type});
            }
        });
    })
    .put(function (request, response) {
        Types.Model.findById(request.params.type_id, function (error, type) {
            if (error) {
                response.send({error: error});
            }
            else {
                type.name = request.body.type.name;
                type.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({type: type});
                    }
                });
            }
        });
    })
     .patch(function (request, response) {
        Types.Model.findById(request.params.type_id, function (error, type) {
            if (error) {
                response.send({error: error});
            }
            else {
                type.name = request.body.type.name;
                type.questions.push(request.body.question);
                type.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({type: type});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        Types.Model.findByIdAndRemove(request.params.type_id,
            function (error, deleted) {
                if (!error) {
                    response.json({type: deleted});
                }
            }
        );
    });
module.exports = router;
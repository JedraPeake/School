var express = require('express');
var router = express.Router();
var Physiotherapists = require('../models/physiotherapist');


//all physiotherapists
router.route('/')

    .post(function (request, response) {
        var physiotherapist = new Physiotherapists.Model(request.body.post);
        physiotherapist.save(function (error) {
            if (error) response.send(error);
            response.json({post: physiotherapist});
        });
    })
    .get(function (request, response) {
        Physiotherapists.Model.find(function (error, physiotherapists) {
            if (error) response.send(error);
            response.json({post: physiotherapists});
        });
    });

//physiotherapists by date hired
router.route('/:physiotherapist_date_hired')
    .get(function (request, response) {
        Physiotherapists.Model.findById(request.params.physiotherapist_date_hired, function (error, physiotherapist) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({post: physiotherapist});
            }
        });
    })
    .put(function (request, response) {
        Physiotherapists.Model.findById(request.params.physiotherapist_date_hired, function (error, physiotherapist) {
            if (error) {
                response.send({error: error});
            }
            else {
                physiotherapist.dateHired = request.body.post.dateHired;
                //post.body = request.body.post.body;
                physiotherapist.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({post: physiotherapist});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Physiotherapists.Model.findByIdAndRemove(request.params.physiotherapist_date_hired,
            function (error, deleted) {
                if (!error) {
                    response.json({post: deleted});
                }
            }
        );
    });

//DO WE WANT TO SEARCH BY DATE FINISHED???? IDKKK

module.exports = router;
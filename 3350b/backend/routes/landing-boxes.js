var express = require('express');
var router = express.Router();
var landingBoxesSchema = require('../models/landing-boxes');

router.route('/')
    
    .post(function (request, response) {
        var landingBox = new landingBoxesSchema.Model(request.body.landingBox);
        
        landingBox.save(function (error) {
            if (error) response.send(error);
            response.json({landingBox: landingBox});
        });
    })
    
    .get(function (request, response) {
        var Client = request.query.filter;
        if(!Client){
            landingBoxesSchema.Model.find(function (error, landingBoxs) {
                if (error) response.send(error);
                response.json({landingBox: landingBoxs});
            });
        } else{
            landingBoxesSchema.Model.find({"client": Client.client}, function (error, landingBoxs) {
                if (error) response.send(error);
                response.json({landingBox: landingBoxs});
            });
            
        }
    });
    
router.route('/:landingBox_id')
    .get(function (request, response) {
        landingBoxesSchema.Model.findById(request.params.landingBox_id, function (error, landingBox) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({landingBox: landingBox});
            }
        });
    })

    .put(function (request, response) {
        landingBoxesSchema.Model.findById(request.params.landingBox_id, function (error, landingBox) {
            if (error) {
                response.send({error: error});
            }
            else {
                landingBox.box1 = request.body.landingBox.box1;
                landingBox.box2 = request.body.landingBox.box2;
                landingBox.boxPoints = request.body.landingBox.boxPoints; 
                landingBox.boxBlurb = request.body.landingBox.boxBlurb; 

                landingBox.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({landingBox: landingBox});
                    }
                });
            }
        });
    })
    
    .patch(function (request, response) {
        landingBoxesSchema.Model.findById(request.params.landingBox_id, function (error, landingBox) {
            if (error) {
                response.send({error: error});
            }
            else {
                landingBox.box1 = request.body.landingBox.box1;
                landingBox.box2 = request.body.landingBox.box2;
                landingBox.boxPoints = request.body.landingBox.boxPoints; 
                landingBox.boxBlurb = request.body.landingBox.boxBlurb; 

                landingBox.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({landingBox: landingBox});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        landingBoxesSchema.Model.findByIdAndRemove(request.params.landingBox_id,
            function (error, deleted) {
                if (!error) {
                    response.json({landingBox: deleted});
                }
            }
        );
    });

module.exports = router;
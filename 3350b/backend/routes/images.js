var express = require('express');
var router = express.Router();
var Images = require('../models/images');


router.route('/')
    .post( function (request, response) {
        var image = new Images.Model(request.body.image);
        image.save(function (error) {
            if (error) response.send(error);
            response.json({image: image});
        });
    })
    
    .get( function (request, response) {
        var Exercise = request.query.filter;
        if(!Exercise){
            Images.Model.find(function (error, images) {
                if (error) response.send(error);
                response.json({image: images});
            });
        }else{
            Images.Model.find({"exercise": Exercise.exercise}, function (error, images) {
                if (error) response.send(error);
                response.json({image: images});
            });
        }
    });

router.route('/:image_id')
    .get( function (request, response) {
        Images.Model.findById(request.params.image_id, function (error, image) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({image: image});
            }
        });
    })
    .put( function (request, response) {
        Images.Model.findById(request.params.image_id, function (error, image) {
            if (error) {
                response.send({error: error});
            }
            else {
                image.name = request.body.image.name;
                image.type = request.body.image.type;
                image.size = request.body.image.size;
                image.rawSize = request.body.image.rawSize;
                image.imageData = request.body.image.imageData;

                image.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({image: image});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Images.Model.findByIdAndRemove(request.params.image_id,
            function (error, deleted) {
                if (!error) {
                    response.json({image: deleted});
                }
            }
        );
    });

module.exports = router;
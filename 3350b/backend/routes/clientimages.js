var express = require('express');
var router = express.Router();
var Clientimages = require('../models/clientimages');


router.route('/')
    .post( function (request, response) {
        var clientimage = new Clientimages.Model(request.body.clientimage);
        clientimage.save(function (error) {
            if (error) response.send(error);
            response.json({clientimage: clientimage});
        });
    })
    
    .get( function (request, response) {
        var Client = request.query.filter;
        if(!Client){
            Clientimages.Model.find(function (error, clientimage) {
                if (error) response.send(error);
                response.json({clientimage: clientimage});
            });
        }else{
            Clientimages.Model.find({"client": Client.client}, function (error, clientimages) {
                if (error) response.send(error);
                response.json({clientimage: clientimages});
            });
        }
    });

router.route('/:clientimage_id')
    .get( function (request, response) {
        Clientimages.Model.findById(request.params.clientimage_id, function (error, clientimage) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({clientimage: clientimage});
            }
        });
    })
    .put( function (request, response) {
        Clientimages.Model.findById(request.params.clientimage_id, function (error, clientimage) {
            if (error) {
                response.send({error: error});
            }
            else {
                clientimage.name = request.body.clientimage.name;
                clientimage.type = request.body.clientimage.type;
                clientimage.size = request.body.clientimage.size;
                clientimage.rawSize = request.body.clientimage.rawSize;
                clientimage.imageData = request.body.clientimage.imageData;

                clientimage.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({clientimage: clientimage});
                    }
                });
            }
        });
    })
    .delete( function (request, response) {
        Clientimages.Model.findByIdAndRemove(request.params.clientimage_id,
            function (error, deleted) {
                if (!error) {
                    response.json({clientimage: deleted});
                }
            }
        );
    });

module.exports = router;
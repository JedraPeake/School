var express = require('express');
var router = express.Router();
var Notes = require('../models/notes');
router.route('/')
    .post(function (request, response) {
        var note = new Notes.Model(request.body.note);
        note.save(function (error) {
            if (error) response.send(error);
            response.json({note: note});
        });
    })
    .get(function (request, response) {
        var Client = request.query.filter;
        console.log(request.query.filter);
        if(!Client){
            Notes.Model.find(function (error, notes) {
                if (error) response.send(error);
                response.json({note: notes});
            });
        } else {
            Notes.Model.find({"client": Client.client}, function (error, notes) {
                if (error) response.send(error);
                response.json({notes: notes});
            }).sort({date:-1});
        }
        
    });

router.route('/:note_id')
    .get(function (request, response) {
        Notes.Model.findById(request.params.note_id, function (error, note) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({note: note});
            }
        });
    })
    .patch(function (request, response) {
        Notes.Model.findById(request.params.note_id, function (error, note) {
            if (error) {
                response.send({error: error});
            }
            else {
                note.title = request.body.note.title;
                note.content=request.body.note.content;
                note.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({note: note});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        Notes.Model.findByIdAndRemove(request.params.note_id,
            function (error, deleted) {
                if (!error) {
                    response.json({note: deleted});
                }
            }
        );
    });
module.exports = router;
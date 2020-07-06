var express = require('express');
var router = express.Router();
var Forms = require('../models/forms');

router.route('/')
    .post(function (request, response) {
        var form = new Forms.Model(request.body.form);
        form.save(function (error) {
            if (error) response.send(error);
            response.json({form: form});
        });
    })
    .get(function (request, response) {
        var Post = request.query.post;
        if (!Post) {
            Forms.Model.find(function (error, form) {
                if (error) response.send(error);
                response.json({form: form});
            });
        } else {
            Forms.Model.find({"form": request.query.form}, function (error, form) {
                if (error) response.send(error);
                response.json({form: form});
            });
        }
    });

router.route('/:form_name')
    .get(function (request, response) {
        Forms.Model.findById(request.params.form_name, function (error, form) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({form: form});
            }
        });
    })
    .put(function (request, response) {
        Forms.Model.findById(request.params.form_name, function (error, form) {
            if (error) {
                response.send(error);
            }
            else {
                form.statement = request.body.rehabilitationPlan.statement; // update rehab plan
                form.save(function (error) { // save plan
                    if (error) {
                        response.send(error);
                    } else {
                        response.status(201).json({rehabilitationPlan: form});
                    }
                });
            }
        });
    })
     .patch(function (request, response) {
        Forms.Model.findById(request.params.form_name, function (error, form) {
            if (error) {
                response.send(error);
            }
            else {
                form.name = request.body.form.name; 
                form.description=request.body.form.description;
                form.questions=request.body.form.questions;
                form.save(function (error) { // save plan
                    if (error) {
                        response.send(error);
                    } else {
                        response.status(201).json({rehabilitationPlan: form});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        Forms.Model.findByIdAndRemove(request.params.form_name,
            function (error, deleted) {
                if (!error) {
                    response.json({form: deleted});
                }
            }
        );
    });
//
// router.route('/:rehabilitationPlan_authorName')
//     .get(function (request, response) {
//         RehabilitationPlans.Model.findById(request.params.rehabilitationPlan_authorName, function (error, rehabilitationPlan) {
//             if (error) {
//                 response.send({error: error});
//             }
//             else {
//                 response.json({rehabilitationPlan: rehabilitationPlan});
//             }
//         });
//     })
//     .put(function (request, response) {
//         RehabilitationPlans.Model.findById(request.params.rehabilitationPlan_authorName, function (error, rehabilitationPlan) {
//             if (error) {
//                 response.send(error);
//             }
//             else {
//                 rehabilitationPlan.statement = request.body.rehabilitationPlan.statement; // update rehab plan
//                 rehabilitationPlan.save(function (error) { // save plan
//                     if (error) {
//                         response.send(error);
//                     } else {
//                         response.status(201).json({rehabilitationPlan: rehabilitationPlan});
//                     }
//                 });
//             }
//         });
//     })
//     .delete(function (request, response) {
//         RehabilitationPlans.Model.findByIdAndRemove(request.params.rehabilitationPlan_authorName,
//             function (error, deleted) {
//                 if (!error) {
//                     response.json({rehabilitationPlan: deleted});
//                 }
//             }
//         );
//     });

module.exports = router;
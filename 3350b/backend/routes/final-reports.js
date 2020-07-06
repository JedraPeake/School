var express = require('express');
var router = express.Router();
var FinalReports = require('../models/final-reports');

router.route('/')
    
    .post(function (request, response) {
        var finalReport = new FinalReports.Model(request.body.finalReport);
        
        finalReport.save(function (error) {
            if (error) response.send(error);
            response.json({finalReport: finalReport});
        });
    })
    
    .get(function (request, response) {
        var Client = request.query.filter;
        if(!Client){
            FinalReports.Model.find(function (error, finalReports) {
                if (error) response.send(error);
                response.json({finalReport: finalReports});
            });
        } else{
            FinalReports.Model.find({"client": Client.client}, function (error, finalReports) {
                if (error) response.send(error);
                response.json({finalReport: finalReports});
            });
            
        }
    });
    
router.route('/:finalReport_id')
    .get(function (request, response) {
        FinalReports.Model.findById(request.params.finalReport_id, function (error, finalReport) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({finalReport: finalReport});
            }
        });
    })

    .put(function (request, response) {
        FinalReports.Model.findById(request.params.finalReport_id, function (error, finalReport) {
            if (error) {
                response.send({error: error});
            }
            else {
                finalReport.reportName = request.body.finalReport.reportName;
                finalReport.date = request.body.finalReport.date; 
                finalReport.pdfArray = request.body.finalReport.pdfArray; 
                finalReport.client = request.body.finalReport.client; 
                finalReport.physiotherapist = request.body.finalReport.physiotherapist; 

                finalReport.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({finalReport: finalReport});
                    }
                });
            }
        });
    })
    
    .patch(function (request, response) {
        FinalReports.Model.findById(request.params.finalReport_id, function (error, finalReport) {
            if (error) {
                response.send({error: error});
            }
            else {
                finalReport.reportName = request.body.finalReport.reportName;
                finalReport.date = request.body.finalReport.date; 
                finalReport.pdfArray = request.body.finalReport.pdfArray; 
                finalReport.client = request.body.finalReport.client; 
                finalReport.physiotherapist = request.body.finalReport.physiotherapist;

                finalReport.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({finalReport: finalReport});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        FinalReports.Model.findByIdAndRemove(request.params.finalReport_id,
            function (error, deleted) {
                if (!error) {
                    response.json({finalReport: deleted});
                }
            }
        );
    });

module.exports = router;

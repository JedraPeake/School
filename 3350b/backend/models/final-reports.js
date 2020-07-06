var mongoose = require('mongoose');
var finalReportsSchema = mongoose.Schema(
    {
        reportName: String,
        date: Date,
        pdfArray: [],
        client: {type: mongoose.Schema.ObjectId, ref: ('Clients')},
        physiotherapist: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')},
        final: Boolean,
        summary: Boolean
    }
);
// User in auth 
var FinalReports = mongoose.model('final-report', finalReportsSchema);
exports.Model = FinalReports;
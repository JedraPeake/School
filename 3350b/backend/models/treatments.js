var mongoose = require('mongoose');
var TreatmentsSchema = mongoose.Schema(
    {
        dateAssign: Date,
        client: {type: mongoose.Schema.ObjectId, ref: ('Clients')},
        physiotherapist: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')},
        rehabilitation: {type: mongoose.Schema.ObjectId, ref: ('Rehabilitations')},
        recommendations: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}]

    }
);
var Treatments = mongoose.model('treatment', TreatmentsSchema);
exports.Model = Treatments;

var mongoose = require('mongoose');
var recommendationSchema = mongoose.Schema(
    {
        timeStamp: Date,
        decision: String,
        treatments: {type: mongoose.Schema.ObjectId, ref: ('Treatments')},
        assessmentTests: {type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')}
    }
);
var Recommendation = mongoose.model('recommendation', recommendationSchema);
exports.Model = Recommendation;

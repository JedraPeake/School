var mongoose = require('mongoose');

var rehabilitationPlansSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        authorName: String,
        goal: String,
        timeFrameToComplete: Date,
        exercises: [{type: mongoose.Schema.ObjectId, ref: ('Exercises')}],
        assessmentTests: [{type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')}],
        treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatments')}]

    }
);
var RehabilitationPlans = mongoose.model('rehabilitation-plan', rehabilitationPlansSchema);
exports.Model = RehabilitationPlans;

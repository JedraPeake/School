var mongoose = require('mongoose');

var rehabilitationsSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        authorName: String,
        goal: String,
        timeFrameToComplete: Date,
        exercises: [{type: mongoose.Schema.ObjectId, ref: ('Exercises')}],
        assessmentTests: [{type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')}],
        treatments: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}]

    }
);
var Rehabilitations = mongoose.model('rehabilitation', rehabilitationsSchema);
exports.Model = Rehabilitations;
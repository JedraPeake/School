var mongoose = require('mongoose');
var formsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        administrator: {type: mongoose.Schema.ObjectId, ref: ('Administrator')},
        assessmentTests: [{type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')}],
        questions: [{type: mongoose.Schema.ObjectId, ref: ('Questions')}]


    }
);
var Forms = mongoose.model('form', formsSchema);
exports.Model = Forms;




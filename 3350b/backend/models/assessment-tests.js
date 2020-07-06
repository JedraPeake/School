var mongoose = require('mongoose');
var assessmentTestsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        authorName: String,
        rehabilitations: {type: mongoose.Schema.ObjectId, ref: ('rehabilitations')},
        testResult: [{type: mongoose.Schema.ObjectId, ref: ('TestResult')}],
        recommendation: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}],
        forms: {type: mongoose.Schema.ObjectId, ref: ('Forms')}

    }
);
var AssessmentTests = mongoose.model('assessment-test', assessmentTestsSchema);
exports.Model = AssessmentTests;

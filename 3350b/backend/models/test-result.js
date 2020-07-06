var mongoose = require('mongoose');
var testResultSchema = mongoose.Schema(
    {
        question: String,
        answer: String,
        assessmentTests: {type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')},
        introForm: {type: mongoose.Schema.ObjectId, ref: ('IntroForms')}
    }
);
var TestResult = mongoose.model('test-result', testResultSchema);
exports.Model = TestResult;

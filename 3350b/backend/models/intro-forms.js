var mongoose = require('mongoose');
var IntroFormsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        authorName: String,
        testResult: [{type: mongoose.Schema.ObjectId, ref: ('TestResult')}],
        forms: {type: mongoose.Schema.ObjectId, ref: ('Forms')},

    }
);
var IntroForms = mongoose.model('intro-form', IntroFormsSchema);
exports.Model = IntroForms;
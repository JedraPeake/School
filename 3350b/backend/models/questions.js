
var mongoose = require('mongoose');
var questionsSchema = mongoose.Schema(
    {
        questionText: String,
        helpDescription: String,
        order: Number,
        type: {type: mongoose.Schema.ObjectId, ref: ('Types')},
        isWritten: Boolean,
        isAgree:Boolean,
        isMultiple: Boolean,
        isYes: Boolean,
        //forms: {type: mongoose.Schema.ObjectId, ref: ('Forms')}

    }
);
var Questions = mongoose.model('question', questionsSchema);
exports.Model = Questions;

var mongoose = require('mongoose');
var typeSchema = mongoose.Schema(
    {
        name: String,
        questions: [{type: mongoose.Schema.ObjectId, ref: ('Questions')}]
    }
);
var Type = mongoose.model('type', typeSchema);
exports.Model = Type;

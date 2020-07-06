var mongoose = require('mongoose');
var imagesSchema = mongoose.Schema(
    {
        name: String,
        type: String,
        size: String,
        rawSize: Number,
        imageData: String,
        exercise: {type: mongoose.Schema.ObjectId, ref: ('Exercises')}
    }
);

var Images = mongoose.model('Images', imagesSchema);
exports.Model = Images;


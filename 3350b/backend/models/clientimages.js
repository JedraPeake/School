var mongoose = require('mongoose');
var imagesSchema = mongoose.Schema(
    {
        name: String,
        type: String,
        size: String,
        rawSize: Number,
        imageData: String,
        client: {type: mongoose.Schema.ObjectId, ref: ('Clients')}
    }
);

var Clientimages = mongoose.model('Clientimages', imagesSchema);
exports.Model = Clientimages;


var mongoose = require('mongoose');
var notesSchema = mongoose.Schema(
    {
        title: String,
        content:String,
        date:Date,
        client: {type: mongoose.Schema.ObjectId, ref: ('Clients')},
        physiotherapist: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')}
    }
);
var Notes = mongoose.model('note', notesSchema);
exports.Model = Notes;
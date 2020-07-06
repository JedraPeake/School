var mongoose = require('mongoose');
var physiotherapistSchema = mongoose.Schema(
    {
        //id: String,
        familyName: String,
        givenName: String,
        email: String,
        dateHired: Date,
        dateFinished: String,
        treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatments')}],
        userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')}

    }
);
var Physiotherapist = mongoose.model('physiotherapist', physiotherapistSchema);
exports.Model = Physiotherapist;

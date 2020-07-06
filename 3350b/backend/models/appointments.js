var mongoose = require('mongoose');
var appointmentsSchema = mongoose.Schema(
    {
        //date: Date,
        //reason : String,
        //other : String,
        available : Boolean,
        startsAt : String,
        endsAt : String,
        clientID : String,
        //occurrences : Object,
        client: {type: mongoose.Schema.ObjectId, ref: ('client')}
    }
);
var Appointments = mongoose.model('appointment', appointmentsSchema);
exports.Model = Appointments;

var mongoose = require('mongoose');
var patientProfileSchema = mongoose.Schema(
    {
        // id: String,
        familyName: String,
        givenName: String,
        email: String,
        DOB: Date,
        postalCode: String,
        phone: String,
        martialStatus: String,
        occupation: String,
        others : String,
        status: String,
        payments: [{type: mongoose.Schema.ObjectId, ref: ('Payments')}],
        appointment: [{type: mongoose.Schema.ObjectId, ref: ('Appointment')}],
        gender: {type: mongoose.Schema.ObjectId, ref: ('Gender')},
        city: {type: mongoose.Schema.ObjectId, ref: ('City')},
        province: {type: mongoose.Schema.ObjectId, ref: ('Province')},
        patientCountry: {type: mongoose.Schema.ObjectId, ref: ('PatientCountry')},
        treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatments')}],
        userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')}

    }
);
var PatientProfile = mongoose.model('patient-profile', patientProfileSchema);
exports.Model = PatientProfile;

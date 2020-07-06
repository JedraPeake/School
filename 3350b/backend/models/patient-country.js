var mongoose = require('mongoose');
var patientCountrySchema = mongoose.Schema(
    {
        name: String,
        patientProfile: [{type: mongoose.Schema.ObjectId, ref: ('PatientProfile')}],
        province: [{type: mongoose.Schema.ObjectId, ref: ('Province')}]


    }
);
var PatientCountry = mongoose.model('patient-country', patientCountrySchema);
exports.Model = PatientCountry;

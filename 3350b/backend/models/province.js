var mongoose = require('mongoose');
var provinceSchema = mongoose.Schema(
    {
        name: String,
        patientProfile: [{type: mongoose.Schema.ObjectId, ref: ('PatientProfile')}],
        patientCountry: {type: mongoose.Schema.ObjectId, ref: ('PatientCountry')},
        city: [{type: mongoose.Schema.ObjectId, ref: ('City')}]

    }
);
var Province = mongoose.model('province', provinceSchema);
exports.Model = Province;

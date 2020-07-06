var mongoose = require('mongoose');
var clientsSchema = mongoose.Schema(
    {
        familyName: String,
        givenName: String, //last name in auth
        email: String,
        DOB: Date,
        age: Number,
        postalCode: String,
        phone: String,
        martialStatus: String,
        healthCadNumber: String,
        occupation: String,
        others : String,
        enabled: Boolean, // added from auth 
        userShadow: {type: mongoose.Schema.ObjectId, ref: ('Passwords')}, // added from auth
        userRoles: [{type: mongoose.Schema.ObjectId, ref: 'UserRoles'}], // added from auth 
        payments: [{type: mongoose.Schema.ObjectId, ref: ('Payments')}],
        appointments: [{type: mongoose.Schema.ObjectId, ref: ('Appointments')}],
        gender: {type: mongoose.Schema.ObjectId, ref: ('Gender')},
        city: {type: mongoose.Schema.ObjectId, ref: ('City')},
        province: {type: mongoose.Schema.ObjectId, ref: ('Province')},
        clientimages: [{type: mongoose.Schema.ObjectId, ref: ('Clientimages')}],
        patientCountry: {type: mongoose.Schema.ObjectId, ref: ('PatientCountry')},
        treatments: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}],
        finalRep: [{type: mongoose.Schema.ObjectId, ref: 'finalReports'}],
        notes: [{type: mongoose.Schema.ObjectId, ref: 'Notes'}],
        userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')},
        introForm: {type: mongoose.Schema.ObjectId, ref: ("IntroForms")},

    }
);
// User in auth 
var Clients = mongoose.model('client', clientsSchema);
exports.Model = Clients;
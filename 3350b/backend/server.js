var mongoose = require('mongoose');
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var logger = require('./logger');
var app = express();
var bodyParser = require('body-parser');

// import URL routes
var exercises = require('./routes/exercises');
var rehabilitationPlans = require('./routes/rehabilitationPlans');
var forms = require('./routes/forms');
var questions = require('./routes/questions');
var types = require('./routes/types');
var assessmentTests = require('./routes/assessmentTests');
var testResults = require('./routes/testResult');
var appointments = require('./routes/appointments');
var city = require('./routes/city');
var gender = require('./routes/gender');
var patientCountry = require('./routes/patientCountry');
var patientProfile = require('./routes/patientProfile');
var payments = require('./routes/payments');
var physiotherapist = require('./routes/physiotherapist');
var province = require('./routes/province');
var recommendation = require('./routes/recommendation');
var treatments = require('./routes/treatments');
var userAccount = require('./routes/user-account');
var photos = require('./routes/images');
var clientphotos = require('./routes/clientimages');
var clients = require('./routes/clients'); // users in ouda
var rehabilitations = require('./routes/rehabilitations');
var notes = require('./routes/notes');
var passwords = require('./routes/passwords'); // added
var roleCodes = require('./routes/role-codes'); // added
var userRoles = require('./routes/user-roles'); // added
var rolePermissions = require('./routes/role-permissions'); // added
var logins = require('./routes/logins'); // added
var roots = require('./routes/roots'); //added
var leavemessages = require('./routes/leavemessages'); 
var introForms = require('./routes/introForms');
// HTTPS config
var privateKey  = fs.readFileSync('./certificate/server_key.pem', 'utf8');
var certificate = fs.readFileSync('./certificate/server_crt.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var finalReports = require('./routes/final-reports');
var landingBoxes = require('./routes/landing-boxes');
// remove the following middleware in the production version
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'https://self-start-project-skananit.c9users.io:8080');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});
app.use(logger);
//app.use(express.static('public'));

// uncomment the following line for the production version
//app.use(express.static('public'));

// the following 2 middleware convert the URL req and res to json format
app.use(bodyParser.json({limit: '10mb'})); 
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({type: 'application/vnd.api+json', limit: '10mb' }));          //<--- EmberJs comment out for postman

// use Express to handle routes
app.use('/exercises', exercises);
app.use('/rehabilitationPlans', rehabilitationPlans);
app.use('/forms', forms);
app.use('/questions', questions);
app.use('/types', types);
app.use('/assessment-tests', assessmentTests);
app.use('/test-results', testResults);
app.use('/appointments', appointments);
app.use('/city', city);
app.use('/gender', gender);
app.use('/patientCountry', patientCountry);
app.use('/patientProfile', patientProfile);
app.use('/payments', payments);
app.use('/physiotherapist', physiotherapist);
app.use('/province', province);
app.use('/recommendation', recommendation);
app.use('/treatments', treatments);
app.use('/user-accounts', userAccount);
app.use('/images', photos);
app.use('/clientimages', clientphotos);
app.use('/rehabilitations', rehabilitations);
app.use('/clients', clients); // users in auth
app.use('/notes', notes);
app.use('/passwords', passwords); // added
app.use('/role-codes', roleCodes); // added
app.use('/user-roles', userRoles); // added
app.use('/role-permissions', rolePermissions); // added
app.use('/logins', logins); // added
app.use('/roots', roots); // added
app.use('/leavemessages', leavemessages);
app.use('/final-reports', finalReports);
app.use('/landing-boxes', landingBoxes);
app.use('/intro-forms', introForms);

// connect to mongoDB using mongoose driver
mongoose.connect('mongodb://localhost/selfStart');

// app.listen(3700, function () {
//     console.log('The Start-up server is listening on port 3700');
// });

// for c9
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3700);
//httpsServer.listen(8443);

app.listen(8082, function () {
    console.log('The Start-up server is listening on port 8082');
});
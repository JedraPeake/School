var mongoose = require('mongoose');
var landingBoxesSchema = mongoose.Schema(
    {
        physiotherapist: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')},
        box1: Boolean,
        boxPoints: [],
        
        box2: Boolean,
        boxBlurb: String,
    }
);
// User in auth 
var LandingBoxs = mongoose.model('landing-box', landingBoxesSchema);
exports.Model = LandingBoxs;
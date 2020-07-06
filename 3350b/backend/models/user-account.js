var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
var userAccountSchema = mongoose.Schema(
    {
        // userAccountName: {type: String, required: true, unique: true},
        userAccountName: String,
        encryptedPassword: String,
        physiotherapist: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')},
        client: {type: mongoose.Schema.ObjectId, ref: ('Clients')},
        administrator: {type: mongoose.Schema.ObjectId, ref: ('Administrator')}
        
        

}
);



var UserAccount = mongoose.model('user-account', userAccountSchema);
// UserAccount.plugin(uniqueValidator);
exports.Model = UserAccount;

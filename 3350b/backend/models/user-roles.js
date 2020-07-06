/**
 * Created by Abdelkader on 2017-02-23.
 */
var mongoose = require('mongoose');
var userRolesSchema = mongoose.Schema(
    {
        dateAssigned: Date,
        user: {type: mongoose.Schema.ObjectId, ref: ('Clients')},
        role: {type: mongoose.Schema.ObjectId, ref: ('RoleCodes')}
    }
);

var UserRoles = mongoose.model('user-role', userRolesSchema);
exports.Model = UserRoles;
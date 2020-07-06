/**
 * Created by Abdelkader on 2017-02-23.
 */
var mongoose = require('mongoose');
var roleCodesSchema = mongoose.Schema(
    {
        name: String,
        userRoles: [{type: mongoose.Schema.ObjectId, ref: 'UserRoles'}],
        features: [{type: mongoose.Schema.ObjectId, ref: 'RolePermissions'}]
    }
);

var RoleCodes = mongoose.model('role-code', roleCodesSchema);
exports.Model = RoleCodes;
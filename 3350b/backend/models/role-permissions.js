/**
 * Created by Abdelkader on 2017-02-23.
 */
var mongoose = require('mongoose');
var rolePermissionsSchema = mongoose.Schema(
    {
        code: String,
        sysFeature: String,
        roleCodes: [{type: mongoose.Schema.ObjectId, ref: ('RoleCodes')}]
    }
);

var RolePermissions = mongoose.model('role-permission', rolePermissionsSchema);
exports.Model = RolePermissions;
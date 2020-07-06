var mongoose = require('mongoose');
var messageSchema = mongoose.Schema(
    {
        ContactName: String,
        ContactEmail: String, 
        ContactMessage: String,
        
    }
);

var LeaveMessages = mongoose.model('leavemessage', messageSchema);
exports.Model = LeaveMessages;

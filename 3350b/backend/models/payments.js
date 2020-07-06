var mongoose = require('mongoose');
var paymentsSchema = mongoose.Schema(
    {
        dayTimeStamp: Date,
        // amount: String,
        note: String,
        threefifty: Boolean,
        onefifty: Boolean,
        seventyfive: Boolean,
        fivefifty: Boolean,
        client: {type: mongoose.Schema.ObjectId, ref: ('client')}
    }
);
var Payments = mongoose.model('payments', paymentsSchema);
exports.Model = Payments;

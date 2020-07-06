var express = require('express');
var router = express.Router();
var LeaveMessages = require('../models/leavemessages');
var nodemailer = require('nodemailer');

router.route('/')
   
    .post(function (request, response) {
        var leavemessage = new LeaveMessages.Model(request.body.leavemessage);
        
        leavemessage.save(function (error) {
            if (error) response.send(error);
        
            response.json({leavemessage: leavemessage});
            var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shahhexagontest@gmail.com',
            pass: 'security1234'
        }
    });
    
    var mailOptions = {
        from: 'shahhexagontest@gmail.com',
        to: 'shahhexagontest@gmail.com',
        subject: 'Inquiry Message from: ' + leavemessage.ContactName,
        // text: 'Please respond to the email at: ' + leavemessage.ContactEmail,
        html: 'Please respond to the email at: ' + leavemessage.ContactEmail + '<br> <br>' + leavemessage.ContactMessage,
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) return console.log(error);
        else {
            console.log('Message sent: ' + info)
            }
    });
            
            
        });
    })
    

    .get(function (request, response) {
        LeaveMessages.Model.find(function (error, leavemessages) {
            if (error) response.send(error);
            response.json({leavemessage: leavemessages});
        });
    });
    
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'shahhexagontest@gmail.com',
    //         pass: 'security1234'
    //     }
    // });
    
    // var mailOptions = {
    //     from: this.ContactEmail,
    //     to: 'shahhexagontest@gmail.com',
    //     subject: this.ContactName + 'Inquiry Message',
    //     text: this.ContactMessage
    // };
    
    // transporter.sendMail(mailOptions, function(error, info) {
    //     if (error) return console.log(error);
    //     else {
    //         console.log('Message sent: ' + info)
    //         }
    // });
    
    router.route('/:leavemessages_id')
    .get(function (request, response) {
        LeaveMessages.Model.findById(request.params.leavemessages_id, function (error, leavemessage) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({leavemessage: leavemessage});
            }
        });
    })

    .put(function (request, response) {
        LeaveMessages.Model.findById(request.params.leavemessages_id, function (error, leavemessage) {
            if (error) {
                response.send({error: error});
            }
            else {
                leavemessage.ContactName = request.body.leavemessage.ContactName;
                leavemessage.ContactEmail = request.body.leavemessage.ContactEmail;
                leavemessage.ContactMessage = request.body.leavemessage.ContactMessage;
                
                

                leavemessage.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({leavemessage: leavemessage});
                    }
                });
            }
        });
    })
    
    .patch(function (request, response) {
        LeaveMessages.Model.findById(request.params.leavemessages_id, function (error, leavemessage) {
            if (error) {
                response.send({error: error});
            }
            else {
                leavemessage.ContactName = request.body.leavemessage.ContactName;
                leavemessage.ContactEmail = request.body.leavemessage.ContactEmail;
                leavemessage.ContactMessage = request.body.leavemessage.ContactMessage;
                
                leavemessage.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({leavemessage: leavemessage});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        LeaveMessages.Model.findByIdAndRemove(request.params.leavemessages_id,
            function (error, deleted) {
                if (!error) {
                    response.json({leavemessage: deleted});
                }
            }
        );
    });

module.exports = router;
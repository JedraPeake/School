var express = require('express');
var router = express.Router();
var UserAccounts = require('../models/user-account');

router.route('/')
    // .post(function (request, response) {
    //     var userAccount = new UserAccounts.Model(request.body.userAccount);
    //     userAccount.save(function (error) {
    //         if (error) response.send(error);
    //         response.json({userAccount: userAccount});
    //     });
    // })

    // .get(function (request, response) {
    //     UserAccounts.Model.find(function (error, userAccounts) {
    //         if (error) response.send(error);
    //         response.json({userAccount: userAccounts});
    //     });
    // });
    
    
    .post(function (request, response) {
        //request.body = {}
        // request.body.exercise = undefined
        
        var userAccount = new UserAccounts.Model(request.body.userAccount);
        userAccount.save(function (error) {
            if (error) response.send(error);
            response.json({userAccount: userAccount});
        });


    })

    .get(function (request, response) {
        
        //  var UserAccountName = request.query.filter;
        // if(!UserAccountName){
        //     UserAccounts.Model.find(function (error, userAccount) {
        //         if (error) response.send(error);
        //         response.json({userAccount: userAccounts});
        //     });
        // } else {
        //     UserAccounts.Model.find({"userAccountName": UserAccountName.userAccountName}, function (error, userAccounts) {
        //         if (error) response.send(error);
        //         response.json({userAccount: userAccounts});
        //     });
        // }
        
        
        
        
        
        
        UserAccounts.Model.find(function (error, userAccounts) {
            if (error) response.send(error);
            response.json({userAccount: userAccounts});
        });
        
        
        
        
        
    });

router.route('/:userAccount_id')
    .get(function (request, response) {
        UserAccounts.Model.findById(request.params.userAccount_id, function (error, userAccount) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({userAccount: userAccount});
            }
        });
    })

    .put(function (request, response) {
        UserAccounts.Model.findById(request.params.userAccount_id, function (error, userAccount) {
            if (error) {
                response.send({error: error});
            }
            else {
                userAccount.userAccountName = request.body.userAccount.userAccountName;
                userAccount.encryptedPassword = request.body.userAccount.encryptedPassword;


                userAccount.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({userAccount: userAccount});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        UserAccounts.Model.findByIdAndRemove(request.params.userAccount_id,
            function (error, deleted) {
                if (!error) {
                    response.json({userAccount: deleted});
                }
            }
        );
    });

module.exports = router;
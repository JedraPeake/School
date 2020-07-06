import Component from '@ember/component';
import Ember from 'ember';
export default Component.extend({
    DS: Ember.inject.service('store'),
    selectedType:null,
    currentCreateAcccount: null,

    actions: {
        submitCreateAccount() {
            
            // var familyName1 = document.getElementById('familyName');
            // var givenName1 = document.getElementById('givenName');
            // var DOB1 = document.getElementById('dofB');
            // var email1 = document.getElementById('email');
            // var phone1 = document.getElementById('phone');
            // var postalCode1 = document.getElementById('postalCode');
            // var occupation1 = document.getElementById('occupation');
            // var status1 = document.getElementById('status');
            
            // localStorage.setItem('familyName', familyName1.value);
            // localStorage.setItem('givenName', givenName1.value);
            // localStorage.setItem('DOB', DOB1.value);
            // localStorage.setItem('email', email1.value);
            // localStorage.setItem('phone', phone1.value);
            // localStorage.setItem('postalCode', postalCode1.value);
            // localStorage.setItem('occupation', occupation1.value);
            // localStorage.setItem('status', status1.value);
            
            // console.log("familyName?:" + localStorage.getItem("familyName"));
            
            
            
            var newAccount = this.get('DS').createRecord('client', {
                        familyName: this.get('familyName'),
                        givenName: this.get('givenName'),
                        DOB: this.get('dofB'),
                        age: this.get('age'),
                        email: this.get('email'),
                        phone: this.get('phone'),
                        postalCode: this.get('postalCode'),
                        occupation: this.get('occupation'),
                        status: this.get('status'),
                        enabled: true,
                    
                    });
                    
                    var currentNewAccount;
                    newAccount.save().then(response =>{
                        
                        currentNewAccount = response.id;
                        // currentNewAccount = this.get('DS').peekRecord('client', response.id);
                        localStorage.setItem('currentNewAccountID', currentNewAccount);
                        
                        // confirmGeneralModal: Ember.computed(function () {
                        //     console.log("ID: " + localStorage.getItem('currentNewAccountID') );
                        //     return 'createConfirmation' + localStorage.getItem('currentNewAccountID');
                        // })

                    });
                   
        }
    }
    
    
});



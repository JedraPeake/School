import Component from '@ember/component';
import Ember from 'ember';
export default Component.extend({
    DS: Ember.inject.service('store'),
    selectedType:null,
   

    actions: {
        submitMessage() {
            
            var newMessage = this.get('DS').createRecord('leavemessage', {
                        ContactName: this.get('ContactName'),
                        ContactEmail: this.get('ContactEmail'),
                        ContactMessage: this.get('ContactMessage'),
                    });
                
                    newMessage.save().then(response =>{
                        // newMessage.sendMail();
                        return true;
                    });
                   
        }
    }
    
});

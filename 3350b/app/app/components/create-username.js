import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    selectedType:null,
    // wrongUserName: true,
    
  //   errorMessage: Ember.computed('error', function () {
  //   return this.get('error');
  // }),
    
  //   isUnique: Ember.observer('userAccountName', function () {
  //   this.set('error', null);
  //   var myStore = this.get('store');
  //   myStore.queryRecord('encryptedPassword', {filter: {userAccountName: this.get('userAccountName')}}).then((userShadow) => {
  //     if (userShadow) {
  //       this.set('wrongUserName', true);
  //     }
  //     else {
  //       this.set('wrongUserName', false);
  //     }
  //   })
  // }),
    
    actions: {
        createUsername() {
        //     var self = this;
        //     console.log('gets here 1');
        // if (self.get('wrongUserName')) {
        //     console.log('gets here 222213221');
        //     self.set('error', self.get('userAccountName') + alert ('help'));
        //     return false;
        //   }
          
        //   else {
            var newUsername = this.get('DS').createRecord('user-account', {

                        userAccountName: this.get('userAccountName'),
                        encryptedPassword: this.get('encryptedPassword')
                        
                        
                    });
                    
                    // var currentUserAccount;
                    newUsername.save().then(response=>{
                        console.log('gets here');
                        // currentUserAccount = this.get('DS').peekRecord('user-account', response.id);
                        
                        return true;
                    });
          }
                   
        }
    // }
});

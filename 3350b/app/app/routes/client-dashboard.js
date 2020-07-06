import Route from '@ember/routing/route';
import crypto from "npm:crypto-browserify";

export default Route.extend({
    //store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  userProfile: null,
  user: null,
  Model: null,
  userName: null,
  encryptedPassword: null,
  isChangingPassword: null,
  error: null,
  
    DS: Ember.inject.service('store'),
    currentID: null,
    beforeModel() {
    if (this.get('oudaAuth').get('isAuthenticated')=== false) {
      this.transitionTo('landing-page');
    }
  },
    decrypt(cipherText){
    var decipher = crypto.createDecipher('aes256', 'SE3350b Winter 2016');
    var dec = decipher.update(cipherText, 'binary', 'ascii');
    dec += decipher.final('ascii');
    return dec;
  },
  //   getName: Ember.computed(function () {
  //   var identity = localStorage.getItem('sas-session-id');
  //   if (identity) {
  //     console.log(this.decrypt(identity));
  //     return this.decrypt(identity);
  //   } else {
  //     return null;
  //   }
  // }),
    init:function(){
      
    var identity = localStorage.getItem('sas-session-id');
    if (identity) {
      console.log('inside get name');
      console.log(this.decrypt(identity));
      return this.decrypt(identity);
    } else {
      return null;
    }
  
  //var authentication = this.get('oudaAuth');
  //var self = this;
    //console.log('username:');  
   // console.log(authentication.getName);  
    localStorage.setItem('currentClientUserName', identity);
    
    var userID = localStorage.getItem('currentClientUserName');
    
    //var myStore = this.get('store');
    var self = this;
    this._super();
    this.get('DS').queryRecord('password', {filter: {userName: userID}}).then(function (userShadow) {
      console.log('id:');  
      console.log(userShadow.get('user').content.id);
      localStorage.setItem('currentClientID', userShadow.get('user').content.id);
     
    });

 
      // var identity = localStorage.getItem('id');
      // this.set('currentID', identity);
      // console.log(identity);
      // this.set('currentID', this.get('DS').findRecord('client', identity));
    },
    
});



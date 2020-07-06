import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  userProfile: null,
  user: null,
  Model: null,
  userName: null,
  encryptedPassword: null,
  isChangingPassword: null,
  error: null,

  errorMessage: Ember.computed('error', function () {
    return this.get('error');
  }),

  getUser: Ember.computed(function () {
    var userID = this.get('client');
    var myStore = this.get('store');
    var self = this;
    myStore.queryRecord('password', {filter: {userName: userID}}).then(function (userShadow) {
      myStore.find('client', userShadow.get('user').get('id')).then(function (user) {
        self.set('userProfile', user);
        //alert(user.id);
        console.log(user);
        return self.get('userProfile');
      });
    });

  }),

  EUP01IsPermitted: Ember.computed(function () { //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("EUP01") >= 0);
    }
  }),

  actions: {
    saveUser() {
      var userID = this.get('client');
      var myStore = this.get('store');
      var authentication = this.get('oudaAuth');
      var self = this;
      myStore.queryRecord('password', {filter: {userAccountName: userID}}).then(function (userShadow) {
        myStore.find('client', userShadow.get('user').get('id')).then( (user)=> {
          console.log(userShadow);
          if (self.get('isChangingPassword')) {
            // validate the old and new passwords first
            if ( !self.get('oldPassword') || self.get('oldPassword').trim().length === 0) {
              self.set('error', 'Please enter the old password value');
            }
            else {
              var savedOldPassword = userShadow.get('encryptedPassword');
              console.log(userShadow);
              console.log(savedOldPassword);
              //var givenOldPassword = userShadow.get('oldPassword')
              //var givenOldPassword = authentication.hash(authentication.hash(self.get('oldPassword')) + userShadow.get('salt'));
              var givenOldPassword = self.get('oldPassword');
              // alert("USER:     " + user + 
              // "      SAVED OLD PASSWORD:      " + savedOldPassword +
              // "      GIVEN OLD PASSOWRD       "  + givenOldPassword 
              // );
              if (savedOldPassword !== givenOldPassword ) {
                self.set('error', 'Incorect old password value');
              } else {
                if (!self.get('newPassword1') || self.get('newPassword1').trim().length === 0) {
                  self.set('error', 'Your must enter a new password value');
                } else {
                  if (self.get('newPassword1') !== self.get('newPassword2')) {
                    self.set('error', 'The new password values do not match');
                  } else {
                    if (self.get('isChangingPassword')) {
                      userShadow.set('encryptedPassword', authentication.hash(self.get('newPassword1')));
                      userShadow.set('passwordMustChanged', true);
                    }

                    userShadow.set('client', self.get('userProfile'));

                    userShadow.save().then(function () {
                      user.save().then(function () {
                        self.get('router').transitionTo('client-settings');
                      });
                    });
                  }
                }
              }
            }
          } else {

                      user.save().then(function () {
                        self.get('router').transitionTo('client-settings');
                      });

          }


        });
      });
    },

    changePassword() {
      this.set('isChangingPassword', true);
    },

    cancelChangePassword() {
      this.set('isChangingPassword', false);

    },


    cancel() {
      this.get('routing').transitionTo('home');
    }
  }
});

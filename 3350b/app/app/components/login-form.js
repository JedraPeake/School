// Manage the behaviour of the login screen
import Ember from 'ember';
export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  isPasswordChanging: null,
  tempPassword: null,
  error: null,
  user: null,
  userName: null,
  
  errorMessage: Ember.computed('error', function () {
    return this.get('error');
  }),
  
  actions: {
    // submit() {
    //     localStorage.setItem('id', "5aba6b1baca2eb182948450b");
    //     this.get('router').transitionTo('client-dashboard' );
        
    // },

    login() {
      
      var authentication = this.get('oudaAuth');
      var self = this;
      if (this.get('name') === "root") {
        authentication.openRoot(this.get('password')).then(function (name) {
          self.get('oudaAuth').set('isLoginRequested', false);
          authentication.set('getName', name);
          // DO NOT DELETE THE FOLLOWING LINE OF CODE:***********************
          // localStorage.setItem('currentClientUserName',name); // *************************
          // ****************************************************************
          //this.get('router').transitionTo('dashboard' );
          self.get('router').transitionTo('dashboard');
        }, function () {
          //console.log("Root" + error);
        });
      } 
      
      //NOT PHYSIO
      else {
        console.log('here');
        
        self.set('error', null);
        //console.log('gets here');
        var usernameLogin = this.get('name');
        //console.log(usernameLogin);
        var usernamePassword = this.get('password');
        
        authentication.open(usernameLogin, usernamePassword).then(function () {

          //console.log(usernameLogin + '?');
          //console.log(usernamePassword + '?');
          self.get('oudaAuth').set('isLoginRequested', false);
          
          authentication.set('getName', self.get('name'));
          //localStorage.setItem('username',self.get('name')); // ***********************
          // DO NOT DELETE THE FOLLOWING LINE OF CODE:***********************
          localStorage.setItem('currentClientUserName',self.get('name')); // *************************
          // ****************************************************************
            // var userID = this.get('client');
            //   var myStore = this.get('store');
            //   myStore.queryRecord('user-role', {filter: {userName: userID}}).then(function (userShadow) {
            //       myStore.find('client', userShadow.get('client').get('id')).then(function (user) {
            //       alert("here");
            //       if(self.get('user-role').id == '5ac2659e48f1b66a31f38ab4'){
            //         self.get('router').transitionTo('client-dashboard');
            //       }
            //       else{
            //         self.get('router').transitionTo('dashboard');
            //       }
            //       self.set('userProfile', user);
            //       alert(user);
            //       return self.get('userProfile');
            //     });
            //   }); 
          self.get('router').transitionTo('client-dashboard');
        }, function (error) {
          if (error === "accountIsDisabled") {
            self.set('error', 'This account is disabled, please contact the system administrator');
          } else {
            if (error === "passwordReset") {
              Ember.$('.ui.changePassword.modal').modal({
                closable: false,
                detachable: false,
                onDeny: function () {
                  self.set('error', null);
                  return true;
                },
                onApprove: function () {
                  if (!self.get('firstPassword') || self.get('firstPassword').trim().length === 0) {
                    self.set('error', 'Your must enter a password value');
                    return false;
                  } else {
                    if (self.get('firstPassword') !== self.get('secondPassword')) {
                      self.set('error', 'Your password and confirmation password do not match');
                      return false;
                    } else {
                      self.set('error', null);
                      var authentication = self.get('oudaAuth');
                      var myStore = self.get('store');
                      var userName = self.get('name');
                      var hashedPassword = authentication.hash(self.get('firstPassword'));

                      myStore.queryRecord('password', {filter: {userName: userName}}).then(function (userShadow) {
                        userShadow.set('encryptedPassword', hashedPassword);
                        userShadow.set('passwordMustChanged', true);
                        userShadow.set('passwordReset', false);
                        userShadow.save().then(function () {
                          self.get('oudaAuth').close();
                          self.get('oudaAuth').set('isLoginRequested', true);
                          self.get('router').transitionTo('login');
                        //  return true;
                        });
                      });
                    }
                  }
                }
              })
                .modal('show');
            } else {
              if (error === "wrongUserName") {
                self.set('error', 'Please enter a correct user name');
              } else {
                if (error === "wrongPassword") {
                  self.set('error', 'Please enter a correct password');
                } else {
                  if (error === "loginFailed") {
                    self.set('error', 'Login Failed ...');
                  }
                }
              }
            }
          }
        });
      }
    },
  },
});


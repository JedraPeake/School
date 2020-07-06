import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  selectedDate: null,
  error: null,
  tagName: '',
  wrongUserName: true,


  errorMessage: Ember.computed('error', function () {
    return this.get('error');
  }),

  isUniqueUserName: Ember.observer('userName', function () {
    this.set('error', null);
    var myStore = this.get('store');
    myStore.queryRecord('password', {filter: {userName: this.get('userName')}}).then((userShadow) => {
      if (userShadow) {
        this.set('wrongUserName', true);
      }
      else {
        this.set('wrongUserName', false);
      }
    })
  }),

  actions: {
    openModal: function () {
      //   this.set('error', null);
      var datestring = (new Date()).toISOString().substring(0, 10);
      this.set('selectedDate', datestring);
      this.set('familyName', "");
      this.set('givenName', "");
      this.set('email', "");
      this.set('userName', "");
      this.set('password', "");
      var self = this;
      Ember.$('.ui.newUser.modal').modal({
        closable: false,
        onDeny: function () {
          return true;
        },
        onApprove: function () {
          var myStore = self.get('store');
          if (self.get('wrongUserName')) {
            self.set('error', self.get('userName') + ' is not available, please enter another user name');
            return false;
          }
          else {
            var newUser = myStore.createRecord('client', {
              familyName: self.get('familyName'),
              givenName: self.get('givenName'),
              email: self.get('email'),
              enabled: true
            });

            var authentication = self.get('oudaAuth');
            newUser.save().then(function (user) {
              var newUserShadow = myStore.createRecord('password', {
                userName: self.get('userName'),
                encryptedPassword: authentication.hash(self.get('password')),
                userAccountExpiryDate: new Date(self.get('selectedDate')),
                passwordMustChanged: true, // user must change the initial password
                passwordReset: true,
                user: user
              });
              newUserShadow.save();
              return true;
            });
          }

        }
      })
        .modal('show');
    },

    assignDate(date) {
      this.set('selectedDate', date);
    },

  }
});

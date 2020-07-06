import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  userRecord: null,
  ID: null,
  Model: null,
  selectedDate: null,
  userName: null,
  encryptedPassword: null,
  isResettingPassword: null,
  error: null,
  wrongUserName: false,
  oldUserName: null,


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

  modalName: Ember.computed(function () {
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return 'editUser' + this.get('ID');
    } else {
      if (authentication.get('userCList').indexOf("EU001") >= 0) {
        return 'editUser' + this.get('ID');
      } else {
        return 'access-denied' + this.get('ID');
      }
    }

  }),

  EU001IsPermitted: Ember.computed(function(){ //Edit User
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("EU001") >= 0);
    }
  }),
  EU002IsPermitted: Ember.computed(function(){ //ResetPassword
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("EU002") >= 0);
    }
  }),
  EU003IsPermitted: Ember.computed(function(){ //Delete user
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("EU003") >= 0);
    }
  }),


  actions: {
    openModal: function() {
      this.set('error', null);
      var userID = this.get('ID');
      var myStore = this.get('store');
      this.set ('userRecord', this.get('store').peekRecord('client', userID));
      var self = this;
      myStore.queryRecord('password', {filter: {user: userID}}).then(function (userShadow) {
        var date = userShadow.get('userAccountExpiryDate');

        var datestring = date.toISOString().substring(0, 10);
        self.set('selectedDate', datestring);
        self.set('userName', userShadow.get('userName'));
        self.set('oldUserName', userShadow.get('userName'));

        Ember.$('.ui.' + self.get('modalName') + '.modal').modal({
          closable  : false,
          transition: 'horizontal flip',
          onDeny: function () {
            return true;
          },
          onApprove : function() {
            var myStore = self.get('store');
            if ( (self.get('userName') !== self.get('oldUserName')) && (self.get('wrongUserName'))) {
              self.set('error', self.get('userName') + ' is not available, please enter another user name');
              return false;
            }
            else {
                userShadow.set('userAccountExpiryDate', new Date(self.get('selectedDate')));
                myStore.find('client',  userShadow.get('user').get('id')).then(function(user) {
                  if (self.get('isResettingPassword')){
                    var authentication = self.get('oudaAuth');
                    userShadow.set('encryptedPassword', authentication.hash(self.get('tempPassword')));
                    userShadow.set('passwordMustChanged', true);
                    userShadow.set('passwordReset', true);
                  }
                  userShadow.set ('userName', self.get('userName'));
                  userShadow.set ('client', self.get('userRecord'));
                  userShadow.save().then(function () {
                    user.save().then(function(){
                      return true;
                    });
                  });
                });
            }
          }
        })
          .modal('show');
      });
    },

    assignDate (date){
      this.set('selectedDate', date);
    },

    resetPassword (){
      this.set('isResettingPassword', true);
    },

    cancelResetPassword () {
      this.set('isResettingPassword', false);
    },

  }
});


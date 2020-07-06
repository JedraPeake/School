import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  userRecord: null,
  ID: null,

  modalName: Ember.computed(function () {
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return 'deleteUser' + this.get('ID');
    } else {
      if (authentication.get('userCList').indexOf("EU003") >= 0) {
        return 'deleteUser' + this.get('ID');
      } else {
        return 'access-denied' + this.get('ID');
      }
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
    openModal: function () {
      var self = this;
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({

        closable: false,
        detachable: false,
        onDeny: function () {
          Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
        },
        onApprove: function () {
          var myStore = self.get('store');
          var userID = self.get('ID');

          myStore.find('client', userID).then(function (client) {
            client.set('userRoles', []);
            client.set('userShadow', null);
            client.save().then(function () {
              client.destroyRecord();
            });
          });
          // delete the related password file
          myStore.queryRecord('password', {filter: {client: userID}}).then(function (userShadow) {
            userShadow.set('client', null);
            userShadow.save().then(function () {
              userShadow.destroyRecord();
            });
          });
          // delete the associated user roles
          myStore.query('userRole', {filter: {client: userID}}).then(function (userRoles) {
            userRoles.forEach(function (userRole) {
              userRole.client = null;
              userRole.role = null;
              userRole.save().then(function () {
                userRole.destroyRecord();
              });
            });
          });
          Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
        }
      })
        .modal('show');
    },
  }


});

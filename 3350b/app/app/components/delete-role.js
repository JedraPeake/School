import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  key : null,

  modalName: Ember.computed(function () {
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return 'deleteRole' + this.get('key');
    } else {
      if (authentication.get('userCList').indexOf("DR001") >= 0) {
        return 'deleteRole' + this.get('key');
      } else {
        return 'access-denied' + this.get('key');
      }
    }

  }),


  DR001IsPermitted: Ember.computed(function(){ //Delete Role
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("DR001") >= 0);
    }
  }),

  actions: {

    openModal: function (roleID) {

      var self = this;
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({

        closable: false,
        detachable: false,
        onDeny: function () {
          Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
        },
        onApprove: function () {
          var myStore = self.get('store');


          // first remove all features  from the role
          myStore.findAll('rolePermission').then(function (features) {
            features.forEach(function (feature) {
              var roles = [];
              feature.get('roleCodes').forEach(function (rolecode) {
                if (rolecode.id !== roleID) {
                  roles.pushObject(rolecode);
                }
              });
              feature.set('roleCodes', roles);
              feature.save();
            });
          });

          // second remove users from the role
          myStore.query('userRole', {filter: {role: roleID}}).then(function (userRole) {
            userRole.forEach(function (oneRole) {
              oneRole.user = null;
              oneRole.role = null;
              oneRole.save().then(function (toDelete) {
                toDelete.destroyRecord();
              });
            });
          });


          // now delete the role
          myStore.find('roleCode', roleID).then(function (role) {
            role.set('userRoles', []);
            role.set('features', []);
            role.save().then(function (toDelete) {
              toDelete.destroyRecord();
            });
          });
          Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
        }
      })
        .modal('show');
    },



  }
});

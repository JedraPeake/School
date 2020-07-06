//
// This controller is responsible to assign system features
// (i.e., system functionality) to the pre-defined system roles
//
import Ember from 'ember';
export default Ember.Component.extend({
  store: Ember.inject.service(),
  roleID: null, // set by the caller
  roleName: null, // set by the caller

  sysFeatureModel: null,
  selectedFeatures: [],

  rolePermissionModel: Ember.computed(function () {
    return this.get('store').findAll('rolePermission');
  }),

  modalName: Ember.computed(function () {
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return 'roleID' + this.get('roleID');
    } else {
      if (authentication.get('userCList').indexOf("MR001") >= 0) {
        return 'roleID' + this.get('roleID');
      } else {
        return 'access-denied' + this.get('roleID');
      }
    }

  }),


  MP001IsPermitted: Ember.computed(function () {
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("MP001") >= 0);
    }
  }),

  actions: {
    openModal: function() {

      this.set('selectedFeatures', []);
      var code = this.get('roleID');
      var myStore = this.get('store');
      var self = this;


      myStore.findAll('rolePermission').then(function (features) {
        features.forEach(function (feature) {
          feature.get('roleCodes').forEach(function (rolecode) {
            if (rolecode.id === code) {
              self.get('selectedFeatures').push(feature.get('id'));
            }
          });

        });
      });

      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable  : false,
        transition: 'horizontal flip',
        detachable: false,
        onDeny: function () {
          Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
        },
        onApprove: function () {
          Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
        }
      })
        .modal('show');
    },



    selectPermission: function(permissions) {
      var myStore = this.get('store');
      var code = this.get('roleID');
      var self = this;

      myStore.findAll('rolePermission').then(function (features) {
        features.forEach(function (feature) {
          var roles = [];
          feature.get('roleCodes').forEach(function (rolecode) {
            if (rolecode.id !== code) {
              roles.pushObject(rolecode);
            }
          });
          feature.set('roleCodes', roles);
          feature.save().then(function () {
            self.set('selectedFeatures', permissions);

          });
        });
      });

      //permissions.forEach(function (onePermission) {
        myStore.findRecord('rolePermission', permissions).then(function (rolePermission) {
          myStore.findRecord('roleCode', code).then(function (roleCode) {
            // update the role name in the rolecode table
            roleCode.set('name',self.get('roleName'));
            roleCode.save() ;
            rolePermission.get('roleCodes').pushObject(roleCode);
            rolePermission.save().then(function () {
              myStore.query('rolePermission', {filter: {roleCodes: code}}).then(function (codes) {
                self.set('sysFeatureModel', codes);
                codes.forEach(feature => {
                  self.get('selectedFeatures').push(feature.get('id'));
                });
              });
            });
          });
        });
      //});
    }
  }
});

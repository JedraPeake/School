import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  modalName: Ember.computed(function () { //Add new role
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return 'newFeature';
    } else {
      if (authentication.get('userCList').indexOf("ANF01") >= 0) {
        return 'newFeature';
      } else {
        return 'access-denied';
      }
    }
  }),

  actions: {
    openModal: function() {

      this.set('code', "");
      this.set('sysFeature', "");
      var self = this;

      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable  : false,
        detachable: false,
        onDeny    : function(){
          return true;
        },
        onApprove : function() {
          var myStore = self.get('store');
          var newRolePermission = myStore.createRecord('rolePermission', {
            code: self.get('code'),
            sysFeature: self.get('sysFeature')
          });
          newRolePermission.save();
          return true;
        }
      })
        .modal('show');
    },

  }

});

import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  modalName: Ember.computed(function () { //Add new role
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return 'newRole';
    } else {
      if (authentication.get('userCList').indexOf("ANR01") >= 0) {
        return 'newRole';
      } else {
        return 'access-denied';
      }
    }
  }),

  actions: {
    openModal: function () {
      var self = this;
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        detachable: false,
        onDeny: function () {
          return true;
        },
        onApprove: function () {
          var myStore = self.get('store');
          var newRoleCode = myStore.createRecord('roleCode', {
            name: self.get('name'),
            userRoles: [],
            features: []
          });
          newRoleCode.save().then(function () {
            return true;
          });
        }
      })
        .modal('show');
    },

  }

});

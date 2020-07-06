import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ID: null,

  modalName: Ember.computed(function () {
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return 'deleteFeature' + this.get('ID');
    } else {
      if (authentication.get('userCList').indexOf("DF001") >= 0) {
        return 'deleteFeature' + this.get('ID');
      } else {
        return 'access-denied' + this.get('ID');
      }
    }

  }),

  DF001IsPermitted: Ember.computed(function(){ //Delete Feature
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("DF001") >= 0);
    }
  }),

  actions: {
    openModal: function (id) {
      var self = this;
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({

        closable: false,
        detachable: false,
        onDeny: function () {
          Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
        },
        onApprove: function () {
          var myStore = self.get('store');

          myStore.find('rolePermission',  id).then(function(feature) {
            feature.set('roleCode', null);
            feature.save().then(function(){
              feature.destroyRecord();
              Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
            });
          });

        }
      })
        .modal('show');
    },
  }
});

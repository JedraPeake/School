import Ember from 'ember';

export default Ember.Component.extend({
  isDataImporting: false,
  tableHeader: [],
  tableData: null,
  store: Ember.inject.service(),

  rolePermissionModel: Ember.computed('isFeaturesEditing', function () {
    return this.get('store').findAll('rolePermission');
  }),

  MF001IsPermitted: Ember.computed(function () { //Manage Features
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("MF001") >= 0);
    }
  }),

  actions: {
    import: function(){
      this.set('isDataImporting', true);
    },

    deleteOneFeature: function (id) {
      var myStore = this.get('store');
      if (confirm('If this a predefined system feature, then the only way to undo this process is to do a factory reset. \nAre you sure you need to delete this feature?')) {

        myStore.find('rolePermission', id).then(function (feature) {
          feature.set('roleCode', null);
          feature.save().then(function () {
            feature.destroyRecord();
          });
        });
      }
    },
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  store: Ember.inject.service(),
  roleCodeModel: Ember.computed(function () {
    return this.get('store').findAll('roleCode');
  }),

  rolePermissionModel: Ember.computed(function () {
    return this.get('store').findAll('rolePermission');
  }),

  MSR01IsPermitted: Ember.computed(function(){ //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("MSR01") >= 0);
    }
  }),


});

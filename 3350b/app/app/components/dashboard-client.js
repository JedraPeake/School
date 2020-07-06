import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    currClientData: null,

    init:function(){
      this._super();
      
      //this.set('currClientData', this.get('DS').findRecord('client', localStorage.getItem('id')));
    },
    VCI01IsPermitted: Ember.computed(function () { //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("VCI01") >= 0);
    }
  }),

});

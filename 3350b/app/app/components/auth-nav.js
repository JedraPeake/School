import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
    VCI01IsPermitted: Ember.computed(function () { //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("VCI01") >= 0);
    }
  }),
});

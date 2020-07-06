import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ID: null,

  actions: {
    assignStatus: function (){
      var userID = this.get('ID');
      var myStore = this.get('store');
      myStore.findRecord('client', userID).then(function(updatedUser){
        if (updatedUser.get('enabled')) {
          updatedUser.set('enabled',false );
        } else {
          updatedUser.set('enabled',true );
        }
        updatedUser.save();
        console.log('Client enable/disable updated');
      });
    }
  }
});

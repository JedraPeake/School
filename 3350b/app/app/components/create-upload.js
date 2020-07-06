import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    
    
    actions: {
    deleteAccount() {
    
    console.log('gets here');
        
        var confirmID = localStorage.getItem('currentNewAccountID');
        console.log(confirmID);
        
        this.get('DS').findRecord('client', confirmID,{backgroundReload:false}).then(function(client) {
        client.destroyRecord();
        console.log("it deleted it ok");
    })
    }
    }
});

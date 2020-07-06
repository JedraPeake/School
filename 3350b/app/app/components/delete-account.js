import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    modalName: Ember.computed(function () {
    return 'Delete-Client' + this.get('ID');
  }),
  
   actions: {
    deleteModal: function () {
      Ember.$('.ui.' + this.get("modalName") + '.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          
          this.get('DS').query('image', {filter: {client: this.get('ID')}}).then(function(rec){
            rec.forEach(function(singleRec){
             singleRec.destroyRecord(); 
            });
            
          }) ;
          

          this.get('DS').findRecord('client', this.get("ID"),{backgroundReload:false}).then(function(client) {
              client.destroyRecord();
                
          });
        }
      })
        .modal('show');
    },
  }
});
    
    

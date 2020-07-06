import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    modalName: Ember.computed(function () {
    return 'Delete-Rehabilitation' + this.get('ID');
  }),
  
  
   actions: {
    deleteModal: function () {
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          console.log(this.get("ID"));
          
          this.get('DS').query('treatment', {filter: {rehabilitation: this.get('ID')}}).then(function(rec){
            rec.forEach(function(singleRec){
             singleRec.get('rehabilitation').set(null); 
            });
            
          });
          
          this.get('DS').findRecord('rehabilitation', this.get("ID"),{backgroundReload:false}).then(function(rehabilitation) {
              rehabilitation.destroyRecord();
            
          });
          

        }
      })
        .modal('show');
    },
  }
});
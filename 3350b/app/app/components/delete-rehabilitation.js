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
          console.log(this.get("IDTreat"));
          this.get('DS').findRecord('treatment', this.get("IDTreat"),{backgroundReload:false}).then(function(treatment) {
              console.log(treatment);
              treatment.set('rehabilitation', null);
              treatment.save();
            
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
    
    

import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    modalName: Ember.computed(function () {
    return 'Reset-Client' + this.get('ID');
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
          //TO DO 
        }
      })
        .modal('show');
    },
  }
});
    
    

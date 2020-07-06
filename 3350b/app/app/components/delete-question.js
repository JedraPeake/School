import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    modalName: Ember.computed(function () {
    return 'Delete-Question' + this.get('ID');
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

          this.get('DS').findRecord('question', this.get("ID"),{backgroundReload:false}).then(function(question) {
          
              question.destroyRecord();
            
          });

          // delete the related comments
         /* this.get('DS').query('questionType', {filter: {question: this.get('ID')}}).then((questionType) => {
            questionType.forEach(function () {
              comment.post = null;
              comment.save().then( () => {
                comment.destroyRecord().then(()=>{
                  return true;
                });
              });
            });
          });*/

        }
      })
        .modal('show');
    },
  }
});
    
    

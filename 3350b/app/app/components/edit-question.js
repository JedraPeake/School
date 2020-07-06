import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),
  questionData: null,
  questionText: Ember.computed.oneWay('questionData.questionText'),
  helpDescription: Ember.computed.oneWay('questionData.helpDescription'),
  order: Ember.computed.oneWay('questionData.order'),

  editModal: Ember.computed(function () {
    return 'editQuestion' + this.get('ID');
  }),

  actions: {
    openEditModal: function () {
      this.set('questionData', this.get('DS').peekRecord('question', this.get('ID')));


      Ember.$('.ui.'+this.get("editModal")+'.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          this.get('DS').findRecord('question', this.get('ID')).then((rec) =>{
            rec.set('questionText', this.get('questionText') );
            rec.set('helpDescription', this.get('helpDescription') );
            rec.set('order', this.get('order') );
            rec.save().then(()=>{
              return true;
            });
          });
        }
      })
        .modal('show');
    }
  },
});


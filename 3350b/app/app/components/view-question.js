import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),
  questionData: null,
  questionText: Ember.computed.oneWay('questionData.questionText'),
  helpDescription: Ember.computed.oneWay('questionData.helpDescription'),
  order: Ember.computed.oneWay('questionData.order'),

  viewModal: Ember.computed(function () {
    return 'viewQuestion' + this.get('ID');
  }),



  actions: {
    openViewModal: function () {
      this.set('questionData', this.get('DS').peekRecord('question', this.get('ID')));


      Ember.$('.ui.'+this.get("viewModal")+'.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        }
       
      })
        .modal('show');
    }
  },
});

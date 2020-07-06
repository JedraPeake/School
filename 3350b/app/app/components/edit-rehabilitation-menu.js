import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),
  rehabilitationData: null,
  name: Ember.computed.oneWay('rehabilitationData.name'),
  description: Ember.computed.oneWay('rehabilitationData.description'),
  authorName: Ember.computed.oneWay('rehabilitationData.authorName'),
  goal: Ember.computed.oneWay('rehabilitationData.goal'),
  timeFrameToComplete: Ember.computed.oneWay('rehabilitationData.timeFrameToComplete'),
    
  editModal: Ember.computed(function () {
    return 'editRehabilitation' + this.get('ID');
  }),

  actions: {
    openEditModal: function () {
      this.set('rehabilitationData', this.get('DS').peekRecord('rehabilitation', this.get('ID')));


      Ember.$('.ui.'+this.get("editModal")+'.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          this.get('DS').findRecord('rehabilitation', this.get('ID')).then((rec) =>{
              
              
            rec.set('name', this.get('name') );
            rec.set('description', this.get('description') );
            rec.set('authorName', this.get('authorName') );
            rec.set('goal', this.get('goal') );
            rec.set('timeFrameToComplete', this.get('timeFrameToComplete') );

            // rec.get('store').commit();
            rec.save().then(()=>{
              this.get('onConfirm')(); 
              //return true;
            });
          });
        }
      })
        .modal('show');
    }
  },
});


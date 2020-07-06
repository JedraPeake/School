import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    currClientData: null,
    
    modalName: Ember.computed(function () {
        return 'addRehabilitation' + this.get('ID');
    }),
  
    init:function(){
      this._super();
      this.set('currClientData', this.get('DS').peekRecord('client', this.get('ID')));
    },
  
    actions: {
        
        openRehabModal: function () {
            this.set('name', null);
            this.set('author', null);
            this.set('goal', null);
            this.set('complete', null);
            this.set('description', null);
            
            Ember.$('.ui.newRehab.modal').modal({
                closable: false,
                detachable: false,
                
                onDeny: () => {
                    return true;
                },
            
                onApprove: () => {
                    //FIX DATES ITS IN IBLOG
                    
                    var newRehabPlan = this.get('DS').createRecord('rehabilitation',{
                        name: this.get('name'),
                        description: this.get('description'),
                        timeStamp: "1996-01-01T00:00:00.000Z",
                        authorName: this.get('author'),
                        goal: this.get('goal'),
                        timeFrameToComplete: "1996-01-01T00:00:00.000Z"
                        
                    });
                    
                    var currentRehabPlan;
                    newRehabPlan.save().then(response=>{
                    
                        currentRehabPlan = this.get('DS').peekRecord('rehabilitation', response.id);
                        
                        var newTreat = this.get('DS').createRecord('treatment', {
                            dateAssign: "1996-01-01T00:00:00.000Z",
                            client: this.get('currClientData'),
                            rehabilitation: currentRehabPlan,
                        });
                        
                        newTreat.save().then(response=>{
                           this.get('onConfirm')(); 
                        });
                        
                    });
                    
                }
            })
            .modal('show');
        },
        
    }
});

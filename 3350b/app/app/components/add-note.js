import Component from '@ember/component';
export default Component.extend({
  DS: Ember.inject.service('store'),

  actions: {
   
    noteModal: function () {
        console.log(this.get('clientId'));
      Ember.$('.ui.newNote.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
        return true;
    },
    
       onApprove: () => {
           let currentClient=this.get('DS').peekRecord('client', this.get('clientId'));
                    var newNote = this.get('DS').createRecord('note', {
                        title: this.get('title'),
                        content: this.get('content'),
                        date: new Date(),
                        client: currentClient
                    });
                    currentClient.get('notes').pushObject(newNote);
                    newNote.save().then(()=>{
                        currentClient.save();
                        this.get('onConfirm')(); 
                        //return true;
                    });
                    return true;
                }
    })
    .modal('show');
    },
  }
});
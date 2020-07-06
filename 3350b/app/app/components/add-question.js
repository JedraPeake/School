import Component from '@ember/component';
export default Component.extend({
  DS: Ember.inject.service('store'),
selectedType:'5aba73e6aca2eb1829484512',
  actions: {
    typeChange: function(value){
      this.set('selectedType',value);
      console.log(this.get('selectedType'));
    },
    openModal: function () {
      Ember.$('.ui.newQuest.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
        return true;
    },
    
       onApprove: () => {
        // console.log(this.get('selectedType'));
         //console.log(this.get('DS').peekRecord('type',this.get('selectedType')));
         let _type=this.get('DS').peekRecord('type',this.get('selectedType'));
         let written=false,agree=false,yes=false,multiple=false;
         if(this.get('selectedType')=='5aba73e6aca2eb1829484512'){
           written=true;
         }
         else if (this.get('selectedType')=='5aba6a88aca2eb1829484508'){
           agree=true;
         }
         
         else if (this.get('selectedType')=='5aba6a7eaca2eb1829484507'){
           multiple=true;
         }
         
         else{
           yes=true;
         }
         console.log(_type);
                  let newQuest = this.get('DS').createRecord('question', {
                        questionText: this.get('quest'),
                        helpDescription: this.get('help'),
                        order: this.get('order'),
                        type: _type,
                        isWritten:written,
                        isAgree:agree,
                        isMultiple:multiple,
                        isYes:yes,
                        forms: this.get('form')
                    });
                   
                    newQuest.save().then(()=>{
                      
                        return true;
                    });
                  /* var newType=this.get('DS').createRecord('type', {
                      name:this.get('typeName'),
                      questions:[]
                    });
                    newType.save().then(()=>{
                      return true;
                    });*/
                    return true;
                }
    })
    .modal('show');
    },
  }
});
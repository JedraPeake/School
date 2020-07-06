import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    agree:false,
    yesNo:false,
    written:false,
    multiple:false,
    quests:[],
    selectedList: Ember.computed.reads("quests.length"),
    questTypes:[],
    selectedCount: Ember.computed.reads("questTypes.length"),
    init:function(){
      this._super();
      console.log(this.get('model'));
      var form=this.get('DS').peekRecord('form','5aba6b62aca2eb182948450d');
      console.log(form);
      var i=0;
      while (i<form.get('questions').content.currentState.length){
      this.get('quests').pushObject(this.get('DS').peekRecord('question',form.get('questions').content.currentState[i].id));
      console.log(this.get('DS').peekRecord('question',form.get('questions').content.currentState[i]));
      i++;
      }
      console.log(this.get('quests'));
      i=0;
      while(i<this.get('quests').length){
         
          console.log(this.get('quests')[i].id)
        console.log(this.get('quests')[i])
         this.get('questTypes').pushObject(this.get('quests')[i].get('type').id);
          
          i++;
      }
      console.log(this.get('questTypes'));
    },
    actions: {
        getType(i){
            return this.get('questTypes')[i];
        },
        isAgree(questId){
            if(questId=="5a9c43aeba90ac23af471b56"){
                return true;
            }
            return false;
        },
         isYesNo(questId){
            if(questId=="5a944526b6abaa9c91b39f1b"){
                return true;
            }
            return false;
        },
         isWritten(questId){
            if(questId=="5a9444c1b6abaa9c91b39f19"){
                return true;
            }
            return false;
        },
         isMultiple(questId){
            if(questId=="5a944532b6abaa9c91b39f1c"){
                return true;
            }
            return false;
        }
    }
});

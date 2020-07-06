import Component from '@ember/component';

export default Component.extend({
DS: Ember.inject.service('store'),
formQuest: Ember.computed.oneWay("formQuestions"),
editFormId:null,
formQuestions: [], 
existingForms:[],
done: false,
dataArray:[],
formsLength: Ember.computed.reads('existingForms.length'),
selectedCount: Ember.computed.reads('formQuest.length'),
questIds:[],
isCreating:true,
//selectedCount: Ember.computed.reads('formQuest.length'),

init:function(){
    this._super();
  this.set('existingForms',this.get('DS').findAll('form'));  
},
   didRender(){
        this._super(...arguments);
        Ember.$('#formTable').DataTable();
    },
actions: {
    addQuestion(questId){
        console.log(questId);
    var quest=this.get('DS').peekRecord('question',questId);
    
    if(!this.get('questIds').contains(questId)){
      this.get('questIds').pushObject(questId);
    this.get('formQuest').pushObject(quest);
    console.log(this.get('formQuest'));
    }
    },
    removeQuestion(questId){
        if(this.get('editFormId')==null){
        var quest=this.get('DS').peekRecord('question',questId);
        console.log(quest);
        console.log(this.get('formQuest')[0]);
        this.get('questIds').removeObject(questId);
        var obj;
        var i=0; 
       while(i<this.get('selectedCount')){
            console.log(this.get('formQuest')[i].id);
            if(this.get('formQuest')[i].id==questId){
                obj=this.get('formQuest')[i];
                this.get('formQuest').removeObject(obj);
            }
            i++;
        }
        }
        else{
           var quest=this.get('DS').peekRecord('question',questId);
        console.log(quest);
        console.log(this.get('questIds'));
        this.get('questIds').removeObject(questId);
        var obj;
        var i=0; 
       while(i<this.get('formQuest').content.currentState.length){
            console.log(this.get('formQuest').content.currentState[i].id);
            if(this.get('formQuest').content.currentState[i].id==questId){
               this.get('DS').peekRecord('form',this.get('editFormId')).get('questions').removeObject(this.get('DS').peekRecord('question',questId));
                this.set('formQuest',this.get('DS').peekRecord('form',this.get('editFormId')).get('questions'));
            }
            i++;
        } 
            
        }
    },
    editBtn(){
        this.set('done', false);
        if(this.get('isCreating',true)){
       this.set("isCreating",false);
        }
        else{ this.set("isCreating",true);}
    },
    editForm(formId){
        this.set("editFormId",formId);
        this.set("isCreating",true);
        this.set('formQuest',this.get('DS').peekRecord('form',formId).get('questions'));
        console.log( this.get('formQuest').content);
        this.set('formName',this.get('DS').peekRecord('form',formId).data.name);
        this.set('formDesc',this.get('DS').peekRecord('form',formId).data.description);
        var i=0;
        this.set('questIds',[]);
        while(i<this.get('formQuest').content.currentState.length){
            this.get('questIds').pushObject(this.get('formQuest').content.currentState[i].id);
            i++;
        }
        console.log(this.get('questIds'))
        console.log(this.get('editFormId'));
    },
    saveForm(){
        this.set('done', true);
        var myStore=this.get('DS');
        if(this.get('editFormId')==null){
        var quests=this.get('questIds');
        var len=quests.length;
        var counter=0;
        var newForm = this.get('DS').createRecord('form', {
            name:this.get("formName"),
            description:this.get("formDesc")
            
        });
        console.log(newForm);
       while(counter<len){
           newForm.get('questions').addObject(this.get('DS').peekRecord('question',quests[counter]));
           counter++;
       }
            
         newForm.save().then(()=>{
                        return true;
                    });
        
           
    }
    else{
        this.get('DS').findRecord('form',this.get('editFormId')).then((rec) =>{
            rec.set('name',this.get('formName'));
            rec.set('description',this.get('formDesc'));
            rec.set('questions',[]);
            var quests=this.get('questIds');
             var len=quests.length;
            var counter=0;
             while(counter<len){
           rec.get('questions').addObject(this.get('DS').peekRecord('question',quests[counter]));
           counter++;
       }
           rec.save().then(()=>{
              return true;
            });
        });
        
        
    }
    }
}
});

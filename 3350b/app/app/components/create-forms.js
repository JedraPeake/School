import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    testQuestion:null,
    newIntroId:null,
    introToAdd:null,
    agree:false,
    yesNo:false,
    written:false,
    multiple:false,
    quests:[],
    questLength:Ember.computed.reads('quests.length'),
    formAnswers:[],
    testResultList:[],
    testLength:Ember.computed.reads('testResultList.length'),
    questList:[],
    test:null,
    resultIds:[],
    tempString:null,
    init:function(){
        this._super();
        
         var form=this.get('DS').peekRecord('form','5aba6b62aca2eb182948450d');
      this.set('questList',form.get('questions').content.currentState);
      console.log(this.get('questList')[0].id);
      var tempList=[];
      var store=this.get('DS');
      console.log(store.findRecord('question',this.get('questList')[0].id));
    this.get('questList').forEach(function(quest){
      tempList.pushObject(store.findRecord('question',quest.id));
    });
   
      this.set('quests',tempList);
      console.log(this.get('quests'));
    },
    actions:{
      
      printArray:function(){
        console.log(this.get('formAnswers'));
      },
      
      setAgreeAnswer:function(val,index){
        this.get('formAnswers')[index]=val;
        console.log(this.get('formAnswers')[index]);
      },
      setTextAnswer:function(val,index){
        
        this.get('formAnswers')[index]=val;
        console.log(this.get('formAnswers')[index]);
      },
      confirmIntroForm:function(){
       
       
       let introForm =this.get('DS').peekRecord('form', '5aba6b62aca2eb182948450d');
        var newIntro= this.get('DS').createRecord('intro-form', {
          name:"Intro Form",
          description:introForm.data.description,
          authorName:"Marcotte",
          forms:introForm,
        });
        
        newIntro.save().then((data)=>{
          this.set('newIntroId',data.id);
          console.log(newIntro.id);
          this.set('introToAdd',this.get('DS').peekRecord('intro-form',this.get('newIntroId')));
          console.log(this.get('introToAdd').id);
             var i=0;
        while(i<this.get('DS').peekRecord('form',introForm.id).get('questions').content.currentState.length){
          this.set('testQuestion',this.get('DS').peekRecord('question',this.get('DS').peekRecord('form',introForm.id).get('questions').content.currentState[i].id));
         
         var newTestResult=this.get('DS').createRecord('test-result',{
           question: this.get('testQuestion').data.questionText,
           answer:this.get('formAnswers')[i],
           introForm:this.get('introToAdd')
          });
           
          newTestResult.save().then((data)=>{
            this.get('testResultList').pushObject(newTestResult);
            console.log(this.get('testResultList')[i]);
            this.get('DS').peekRecord('intro-form',this.get('newIntroId')).get('testResult').pushObject(this.get('DS').peekRecord('test-result',data.id));
            this.get('DS').peekRecord('intro-form',this.get('newIntroId')).save();
            return true;
          });
          i++;
        }
        console.log(this.get('testResultList'));
     
        
       
          return true;
        });
        console.log(localStorage.getItem('currentNewAccountID'));
        var clientId=localStorage.getItem('currentNewAccountID').toString();
        console.log(clientId);
      
        this.get('DS').findRecord('client',clientId).then((rec)=>{
         rec.set('introForm',newIntro);
         rec.save().then(()=>{
           return true;
         });
        });
      },
      
    },
});
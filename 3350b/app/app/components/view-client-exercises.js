import Component from '@ember/component';
export default Component.extend({
    
    DS: Ember.inject.service('store'),
    rehabilitationData: Ember.A(),
    rehabilitationData2: Ember.A(),
    exerciseData:[],
    rehabString:null,
    
    viewMore: false,
    selectedEx: false,
    filterImages: null,
    
    viewAss: false,
    AssID:null,
    
    questionData: [],
    selectedData: Ember.computed.reads('questionData.length'),
    
    questionAll: [],
    selectedAll: Ember.computed.reads('questionAll.length'),
    
    questionAns: [],
    selectedAns: Ember.computed.reads('questionAns.length'),
    
    allEx:[],
    selectedAllCount: Ember.computed.reads('allEx.length'),
    
    doneEx:[],
    selectedDoneCount: Ember.computed.reads('doneEx.length'),
    
    
    
    init:function(){
      this._super();
      
      var component = this;
      var rehabilitationData2 = [];
      
      this.get('DS').query('treatment', {filter: {client: localStorage.getItem('currentClientID')}} ).then(response =>{
        var lengthFor = response.content.length;
        for(var i=0; i< lengthFor; i++ ){
            this.get('DS').findRecord('treatment', response.content[i].id, {include: 'exercises'} ).then(response=>{
              console.log(response);
                response.get('rehabilitation').then((result)=>{  
                  console.log(component);
                  component.set( 'rehabilitation',result);
  
                  this.get('rehabilitationData').pushObject(component.rehabilitation);
                  rehabilitationData2.pushObject(component.rehabilitation);
                  
                  var currRehab = this.get('DS').peekRecord('rehabilitation', component.rehabilitation.id);
                  console.log(currRehab);
                  this.get('rehabilitationData2').pushObject(currRehab);
                  
                });
                
            });
            
            
        }
        
      });
      
      
    },
    
    actions: {
      loadMore: function(idCurr){
        this.set('viewMore', true);
        var currEx = this.get('DS').peekRecord('exercise', idCurr);
        this.set('selectedEx', currEx);
        this.set('filterImages', this.get('DS').query('image', {filter: {exercise: idCurr}}));
        
      },
      
      currSelected: function(idSelected, exList){
        this.set('doneEx', []);
        this.set('allEx', []);
        for(var i =0; i< exList.content.currentState.length; i++){
          
          this.get('allEx').pushObject(exList.content.currentState[i]._data.name);
          console.log(this.get('allEx'));  
        }
        
      },
      
      doneEx: function(currDoneEx){
      },
      
      goBack: function(){
        this.set('viewMore', false);
        this.set('viewAss', false);
      },
      
      gotoNextCard: function(currentNum){
        console.log(currentNum);
      },
      
      gotoPrevCard: function(currentNum){
        console.log(currentNum);
      },
      
      toggleCheckBox: function(currDoneEx, currRehab) {
        var index = -1;
        for(var i=0; i< this.get('doneEx').length; i++ ){
          if(this.get('doneEx')[i]  == currDoneEx){
            index = i;
          }
        }
        
        if(index==-1){
          this.get('doneEx').pushObject(currDoneEx);
        }else{
          this.get('doneEx').removeObject(currDoneEx);
        }
        
        if(this.get('doneEx').length == this.get('allEx').length  ){
          this.set('viewMore', true);
          this.set('viewAss', true);
          this.set('doneEx', []);
          this.set('allEx', []);
           this.set('questionAll', []);
            this.set('questionData', []);
             this.set('questionAns', []);
          
          var component = this;
          
          
          this.get('DS').query('assessment-test', {filter: {rehabilitations:currRehab}}).then((response)=>{
            console.log(response.content[0].id)
            this.set('AssID', response.content[0].id)
            
            this.get('DS').findRecord('assessment-test', response.content[0].id, {include: 'forms'} ).then(rec=>{
              //console.log(rec);
              rec.get('forms').then((result)=>{
                console.log(result);
                result.get('questions').then((resp)=>{
                  console.log(resp.currentState);  
                  
                  for( var k = 0; k< resp.currentState.length; k++ ){
                    this.get('questionAll').pushObject(resp.currentState[k]._data.questionText);
                    this.get('questionAns').pushObject("");
                  }
                  
                  console.log(this.get('questionAll'));
                  console.log(this.get('questionAns'));
                  this.set('questionData', resp);
                  
                });
                
              });
            });
            
            
          });
          
          
          
        }
          
       },
       
       setAgreeAnswer: function(val, que){
         console.log(val + que);
         for(var i = 0; i< this.get('selectedAll'); i++){
           if(this.get('questionAll')[i]=== que){
             this.get('questionAns')[i] = val;
             break;
           }
         }
         
         console.log(this.get('questionAns'));
       },
       
       setLongAnswer: function(val, que){
          console.log(val + que);
          console.log(this.get(que));
       },
       
       setYesAnswer: function(val,index){
         
       },
       
       completeAss: function(){
         var AssForm =this.get('DS').peekRecord('assessment-test', this.get('AssID'));
         
         for(var j =0; j< this.get('selectedAll'); j++ ){
         
           var newTestResult=this.get('DS').createRecord('test-result',{
             question: this.get('questionAll')[j],
             answer:this.get('questionAns')[j],
             assessmentTests:AssForm
            });
           
           newTestResult.save().then((data)=>{
             console.log(data);
           });
         }
       }
       
      
    }
    
    
    
    
});

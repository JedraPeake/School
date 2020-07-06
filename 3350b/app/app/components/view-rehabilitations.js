import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    rehabilitationData: null,
    viewRehabilitation: false,
    
    exerciseListData: null,
    exerciseSelectListData: [],
    selectedCount: Ember.computed.reads('exerciseSelectListData.length'),
    
    clientListData: null,
    selectedClientListData: [],
    
    client:[],
    currentSelectedRehabPlan: null,
    currentExList: [],
    
    currentRehabPlanMore: null,
    currentClients:null,
    
    isCreating:false,
    saved:false,
    


    init:function(){
      this._super();
      this.set('rehabilitationData', this.get('DS').peekAll('rehabilitation'));
      this.set('exerciseListData', this.get('DS').peekAll('exercise'));
      
      this.set('clientListData', this.get('DS').peekAll('client'));
      //console.log(this.get('clientListData'));
      this.set('exerciseSelectListData', []);
      
      this.set('name', null);
      this.set('author', null);
      this.set('goal', null);
      this.set('description', null);
      
    },
    
    didRender(){
        this._super(...arguments);
        Ember.$('#example').DataTable();
    },
    

    
    actions:{
      
    
 
    editBtn(){
      this.set('saved', false);
        if(this.get('isCreating',true)){
            this.set('isCreating',false);
        }else{
          this.set("isCreating",true);

        }
      
    },
      
      selectEx2(tempid) {
        console.log(tempid);
        var exRecord = this.get('DS').peekRecord('exercise', tempid);
        this.get('exerciseSelectListData').pushObject(exRecord);
        console.log(this.get('exerciseSelectListData'));
      },
      
      deselectEx2(tempid) {
        console.log(tempid);
        var exRecord = this.get('DS').peekRecord('exercise', tempid);
        this.get('exerciseSelectListData').removeObject(exRecord);
        console.log(this.get('exerciseSelectListData'));
        
      },
      
      saveExMenu (){
        this.set('saved', true);
        console.log("clicked");
        console.log(this.get('client'));
        
        var cliTable = document.getElementsByClassName('ui label transition visible');
        console.log(cliTable);
        
        var rehabID;
        var newRehabPlan = this.get('DS').createRecord('rehabilitation',{
            name: this.get('name'),
            description: this.get('description'),
            timeStamp: Date.now(),
            authorName: this.get('author'),
            goal: this.get('goal'),
            timeFrameToComplete: "1996-01-01T00:00:00.000Z"
            
        });
        
        for(var i =0; i< this.get('exerciseSelectListData').length ; i++){
          console.log(this.get('exerciseSelectListData')[i]);
          newRehabPlan.get('exercises').addObject(this.get('exerciseSelectListData')[i]);
        }
        
        var currentRehabPlan;
        newRehabPlan.save().then(response=>{
            currentRehabPlan = this.get('DS').peekRecord('rehabilitation', response.id);
            rehabID = response.id;
            console.log("1 ");
            console.log(response);
            for(var i=0; i< cliTable.length; i++ ){
              
              var currClientRecord = this.get('DS').peekRecord('client', cliTable[i].dataset.value );
              
              var newTreat = this.get('DS').createRecord('treatment', {
                dateAssign: Date.now(),
                client: currClientRecord,
                rehabilitation: currentRehabPlan,
              });
            
              newTreat.save().then(response=>{
                
                return true;
              });
            
              
            }
            
        });

      },
      
      rehabDone: function () {
          this.set('viewRehabilitation', false);
          
          this.set('exerciseSelectListData', []);
          this.set('name', null);
          this.set('author', null);
          this.set('goal', null);
          this.set('description', null);
        },
      
      loadRehab: function(currentID){
          this.set('currentRehabPlanMore', null);
        
          this.set('viewRehabilitation', true);
          var rehabRecord = this.get('DS').peekRecord('rehabilitation', currentID);
          this.set('currentSelectedRehabPlan', rehabRecord);
          console.log(rehabRecord.get('exercises').content.currentState.length);
          this.set('currentRehabPlanMore', rehabRecord);
          
          var i=0;
          while (i<rehabRecord.get('exercises').content.currentState.length){
          this.get('currentExList').pushObject(this.get('DS').peekRecord('exercise', rehabRecord.get('exercises').content.currentState[i].id));
          
          i++;
          }
          
          console.log(currentID);
          this.set('currentClients', this.get('DS').query('treatment', {filter: {rehabilitation: currentID }}));
          console.log(this.get('currentClients'));
          
          
        },
        
      itemClicked: function(clientid){
          // console.log(clientid);
          // var clientRecord = this.get('DS').peekRecord('client', clientid);
          // this.get('selectedClientListData').pushObject(clientRecord);
          // console.log(this.get('selectedClientListData'));
          
        },
        
      assignRehab: function(){
        var cliTable = document.getElementsByClassName('ui label transition visible ');
        console.log(cliTable);
        
         for(var i=0; i< cliTable.length; i++ ){
                            
            var currClientRecord = this.get('DS').peekRecord('client', cliTable[i].dataset.value );
            
            var newTreat = this.get('DS').createRecord('treatment', {
              dateAssign: Date.now(),
              client: currClientRecord,
              rehabilitation: this.get('currentRehabPlanMore'),
            });
            
            newTreat.save().then(response=>{
              return true;
            });
            
          }
      },
      
      editMe: function(){
        
      }
      
      
    
    }
    
});

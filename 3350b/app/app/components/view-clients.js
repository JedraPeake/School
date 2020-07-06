import Component from '@ember/component';

const FONT_SIZE = 16;
const LINE_HEIGHT = 10;
const PADDING_X = 20;

export default Component.extend({
    DS: Ember.inject.service('store'),
    clientData: null,
    searchVal:null,
    currentID:null,
    userData:null,
    familyName: null,
    givenName: null,
    email: null,
    DOB: null,
    postalCode: null,
    phone: null,
    occupation: null,
    filterTreatments: null,
    filterTreatmentName: [],
    hasPlan: null,
    noTest: null,
    addingTest: false,
    assessTests: [],
    addedTests:[],
    assessIds:[],
    viewProfile: false,
    filterImages: null,
    rehabId:null,
    selectedCount: Ember.computed.reads('addedTests.length'),
    assessName:null,
    assessDesc:null,
    testQuestion:null,
    testToAdd:null,
    newTestId:null,
    clientNotes:null,
    clientReports:null,
    clientSummaryReports:null,
    currentClientID: null,
    paymentsArray: [],
    paymentsArrayLength: Ember.computed.reads('paymentsArray.length'),
    compLength: Ember.computed.reads('clientNotes.length'),
    photosLength: Ember.computed.reads('filterImages.length'),

    init:function(){
      this._super();
      this.set('clientData', this.get('DS').peekAll('client'));
      this.set('addingTest',false);
      this.set('assessTests',this.get('DS').findAll('form'));
      
    },
    
    didRender(){
        this._super(...arguments);
        Ember.$('#clientTable').DataTable();
    },
    
    ready:function(){
        Ember.$('#clientTable').DataTable();
    }, 
    
    actions: {
      profileClicked: function () {
        this.set('viewProfile', true);
        
      },
      
      addAssessment:function(planId){
        console.log('hi');
        if(!this.get('addingTest')){
          this.set('rehabId',planId);
          this.set('addedTests',this.get('DS').query('assessment-test', {
            filter: {
              rehabilitations:this.get('rehabId')
            }
          })
        )
        this.set('addingTest',true);
        this.set('viewProfile',false);
      }
        else{
        this.set('addingTest',false);
        this.set('viewProfile',true);
        }
      },
      
      confirmAssessment:function(){
       let rehab = this.get('DS').peekRecord('rehabilitation',this.get('rehabId'));
       var counter=0;
       while(counter<this.get('assessIds').length){
         rehab.get('assessmentTests').addObject(this.get('DS').peekRecord('assessment-test',this.get('assessIds')[counter]));
         counter++;
       }
       rehab.save().then(()=>{
         return true;
       });
        
      },
      
      removeAssessment:function(testId){
        this.get('assessIds').removeObject(testId);
        console.log(this.get('assessIds'));
        var obj;
        var i=0; 
       while(i<this.get('addedTests').content.currentState.length){
            console.log(this.get('addedTests').content.currentState[i].id);
            if(this.get('addedTests').content.currentState[i].id==testId){
               this.get('DS').peekRecord('rehabilitation',this.get('rehabId')).get('assessmentTests').removeObject(this.get('DS').peekRecord('assessment-test',testId));
            }
            i++;
        }
        this.set('addedTests',this.get('DS').peekRecord('rehabilitation',this.get('rehabId')).get('assessmentTests'));
        this.set('testToAdd',this.get('DS').peekRecord('assessment-test',testId));
       this.get('DS').peekRecord('assessment-test',testId).destroyRecord();
      },
      
      clickAssessment:function(testId){
        let rehab=this.get('DS').peekRecord('rehabilitation',this.get('rehabId'));
        this.get('assessIds').pushObject(testId);
       this.set('assessName',this.get('DS').peekRecord('form',testId).data.name);
       this.set('assessDesc',this.get('DS').peekRecord('form',testId).data.description);
       this.set('testToAdd',this.get('DS').peekRecord('form',testId));
       
        var newTest= this.get('DS').createRecord('assessment-test', {
          name:this.get('assessName'),
          description:this.get('assessDesc'),
          authorName:"Marcotte",
          forms:this.get('testToAdd'),
          rehabilitations: this.get('DS').peekRecord('rehabilitation',this.get('rehabId'))
        });
        
        newTest.save().then((data)=>{
          this.set('newTestId',data.id);
          this.set('testToAdd',this.get('DS').peekRecord('assessment-test',this.get('newTestId')));
             var i=0;
        while(i<this.get('DS').peekRecord('form',testId).get('questions').content.currentState.length){
          this.set('testQuestion',this.get('DS').peekRecord('question',this.get('DS').peekRecord('form',testId).get('questions').content.currentState[i].id));
         
          var newTestResult=this.get('DS').createRecord('test-result',{
           question: this.get('testQuestion').data.questionText,
           answer:"",
           assessmentTests:this.get('testToAdd')
          });
           
          newTestResult.save().then((data)=>{
            this.get('DS').peekRecord('assessment-test',this.get('newTestId')).get('testResult').addObject(this.get('DS').peekRecord('test-result',data.id));
            this.get('DS').peekRecord('assessment-test',this.get('newTestId')).save();
            
            return true;
          });
          i++;
        }
        
        this.set('addedTests', this.get('DS').peekRecord('rehabilitation',this.get('rehabId')).get('assessmentTests'));
       
          return true;
        });

       console.log(this.get('assessIds'));
        
      },
      
      searched: function(){
        this.set('searchVal',this.get('search'));
        console.log(this.get('searchVal'));
      },
      
      checkSearch: function(_client){
        retVal:false;
        if(this.get('searchVal')==null||_client.familyName==this.get('searchVal')||_client.givenName==this.get('searchVal')){
          this.set('retVal',true);
        }
        return this.get('retVal');
      },
      
      profileDone: function () {
        this.set('viewProfile', false);
      },
      
      loadProfile: function(id, familyName, givenName, email, DOB, postalCode, phone, occupation){
        this.get('paymentsArray').clear();
        
        this.set('currentID', id);
        this.set('viewProfile', true);
        this.set('familyName', familyName);
        this.set('givenName', givenName);
        this.set('email', email);
        this.set('DOB', DOB);
        this.set('postalCode', postalCode);
        this.set('phone', phone);
        this.set('occupation', occupation);
        this.set('filterImages', this.get('DS').query('clientimage', {filter: {client: this.get('currentID')}}));
        this.set('filterTreatments', this.get('DS').query('treatment', {filter: {client: this.get('currentID')}}));
        this.set('clientNotes', this.get('DS').query('note', {filter: {client: this.get('currentID')}}));
        
        // find the payments for this client
        this.get('DS').query('payment', {filter: {client: this.get('currentID')}}).then((response)=>{
          console.log('PAYMENTS');
          console.log(response);
          
          console.log(response.content.length);
          // loop through the array of payments for this client 
          for (var i=0; i < response.content.length ; i++){
             // payment package - 350
                 if (response.content[i]._data.threefifty){
                   this.get('paymentsArray').pushObject(Ember.Object.create({
                        clientPaymentDate: response.content[i]._data.dayTimeStamp,
                        clientPaymentPackage:"Assessment Package + 3 Sessions",
                        clientPaymentAmount: "$350.00",
                    }));
                 }
                 
                 // payment package - 150
                 else if (response.content[i]._data.onefifty){
                   this.get('paymentsArray').pushObject(Ember.Object.create({
                        clientPaymentDate: response.content[i]._data.dayTimeStamp,
                        clientPaymentPackage: "Assessment Package",
                        clientPaymentAmount: "$150.00",
                    }));
                 }
                 
                 // payment package - 750
                 else if (response.content[i]._data.seventyfive){
                   this.get('paymentsArray').pushObject(Ember.Object.create({
                        clientPaymentDate: response.content[i]._data.dayTimeStamp,
                        clientPaymentPackage: "Single follow-up appointment within 3 months of initial consultation",
                        clientPaymentAmount: "$75.00",
                    }));
                 }
                 // payment package - 550
                 else if (response.content[i]._data.fivefifty){
                   console.log('INSIDE 550')
                  console.log(response.content[i]._data.dayTimeStamp);
                   this.get('paymentsArray').pushObject(Ember.Object.create({
                        clientPaymentDate: response.content[i]._data.dayTimeStamp,
                        clientPaymentPackage: "Assesment Package + 6 Sessions",
                        clientPaymentAmount: "$550.00",
                    }));
                 }
          }
   
        });
        this.get('DS').query('treatment', {filter: {client: this.get('currentID')}}).then((response)=>{
          
          
          for(var i =0; i< response.content.length; i++){
            
            this.get('DS').findRecord('treatment', response.content[i].id, {include:'rehabilitations'} ).then((rec)=>{
              //console.log(rec.get('rehabilitation').content.get('exercises'));
              for(var j =0; j< rec.get('rehabilitation').content.get('exercises').content.currentState.length; j++){
                //console.log(rec.get('rehabilitation').content.get('exercises').content.currentState[j].id);
                
                var currentExID = rec.get('rehabilitation').content.get('exercises').content.currentState[j].id;
                console.log(currentExID);
                
                  this.get('DS').findRecord('exercise', currentExID ).then((response)=>{
                        var push = true;
                        console.log(response.data.name);
                        for(var k =0; k< this.get('filterTreatmentName').length; k++){
                          console.log(this.get('filterTreatmentName')[k]);
                          if(response.data.name ==  this.get('filterTreatmentName')[k]){
                            push = false;
                          }
                        }
                        console.log(push);
                        if(push == true){
                          this.get('filterTreatmentName').pushObject(response.data.name);
                        }
                        
                    });
                    
                  
                //console.log( this.get('filterTreatmentName') );
              }
              
              
            }); 
            //console.log(response.content[i].get('rehabilitation'));
          }
          
        });
        
        this.get('DS').query('final-report', {filter: {client: this.get('currentID')}}).then((response)=>{
          this.set('clientReports', response);
          console.log(response);
        });  
        
      },
      
      updateTreatments: function(){
        this.set('filterTreatments', this.get('DS').query('treatment', {filter: {client: this.get('currentID')}}));
      },
      
      updateNotes: function() {
         this.set('clientNotes', this.get('DS').query('note', {filter: {client: this.get('currentID')}}));
        
      },
      
      updateReports: function() {
         this.set('clientReports', this.get('DS').query('final-report', {filter: {client: this.get('currentID')}}));
        
      },
      
      
    },
});

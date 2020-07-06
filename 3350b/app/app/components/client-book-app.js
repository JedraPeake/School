import Component from '@ember/component';
import Ember from 'ember';


export default Component.extend({
  
  DS: Ember.inject.service('store'),
    modalName: Ember.computed(function () {
    return 'Confirm-Client' + this.get('ID');
  }),

    currentClientID: null,
   currClientData: null,
  occurrences: Ember.A(),
  appointmentData: null,
  docAvailable: false,
  clientData: null,
  noApp: true,
  occurencesLength: Ember.computed.reads('occurrences.length'),
deleting: false,
  
  init:function(){
      this._super();
      this.get('occurrences').clear();
      var identity = localStorage.getItem('currentClientID');
      this.set('currClientData', this.get('DS').findRecord('client', identity));
      this.set('currentClientID', identity);

      // pull availability from backend 
      this.get('DS').findAll('appointment').then((response)=>{
        for (var i=0; i < response.content.length ; i++){
          
         if(response.content[i]._data.available == false){ //if false then appointment is booked
            // loop through the booked appoitments 
            // peek each client record that booked an appointment and compare id to currentClientID
            this.set('clientData', this.get('DS').peekRecord('appointment', response.content[i].id ).get('client'));
             if(this.get('clientData').content.id == this.get('currentClientID')){
               this.set('noApp', false);
               // then show the appointment by pushing it to the occurences array 
              this.get('occurrences').pushObject(Ember.Object.create({
              title: "Your Appointment",
              startsAt: response.content[i]._data.startsAt ,
              endsAt: response.content[i]._data.endsAt, 
              appointmentID: response.content[i].id,
              }));
             }
            
          }
        }
      });
      
  },

  actions: {
    calendarAddOccurrence: function(occurrence) {
      // make a new array and populate it 
      // modal will pop up and confirm then save in backend with client 
      // they go to make an appoitnment 
      // search backend for record and check if availabile = true 
      // mark it as booked and save client and link
      // otherwise error message to client saying doctor isnt availbale 
      console.log(occurrence.get('startsAt'));
      this.get('DS').query('appointment', {
        filter: {
          startsAt: occurrence.get('startsAt')
        }
        
      }).then((response)=>{

        this.set('appointmentData', response.content[0]);
        if (this.appointmentData != undefined){
           this.set('docAvailable', true); // this means doc has availability 
             Ember.$('.ui.' + this.get("modalName") + '.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          // set available to true 
          // save client and link 
          // make them an appointment 

            this.get('occurrences').pushObject(Ember.Object.create({
              title: "Your Appointment",
              startsAt: occurrence.get('startsAt'),
              endsAt: occurrence.get('endsAt'),
              appointmentID:  response.id,
            }));  
            
            // save in backend - make a new model called appointment - new model = availablity 
            // find it - update it 
            
          this.get('DS').findRecord('appointment', this.appointmentData.id).then((rec) =>{

                rec.get('available');
                rec.get('client');
                rec.set('available', false);
                // console.log(this.get('currClientData').content.id);
                rec.set('client', this.get('currClientData') );
                
                rec.save();
                  
      });
            
        
        }
      })
        .modal('show');
            
        }
        else {
          this.set('docAvailable', false); // this means doc does not have availability 
             Ember.$('.ui.' + this.get("modalName") + '.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          
         // DO NOTHING !!!!!!
          
        
        }
      })
        .modal('show');
        
         }
        
     
        });

    },
    
   

    calendarUpdateOccurrence: function(occurrence, properties) {
      // occurrence.setProperties(properties);
    },

    calendarRemoveOccurrence: function(occurrence) {
      console.log(occurrence);
      
      this.set('deleting', true);
      Ember.$('.ui.' + this.get("modalName") + '.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          
         // FRONTEND - DELETE APPOINTMENT 
          this.get('occurrences').removeObject(occurrence);
          // BACKEND - SET AVAILABLE TO TRUE 
          //console.log(occurrence.app)
          this.get('DS').findRecord('appointment', occurrence.appointmentID).then((rec) =>{

                rec.get('available');
                rec.get('client');
                rec.set('available', true);
                rec.set('client', null);
                rec.save();
                  
      });
        
        }
      })
        .modal('show');
      }
    
  }
  
});

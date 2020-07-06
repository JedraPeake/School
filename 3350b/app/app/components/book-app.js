import Ember from 'ember';

export default Ember.Component.extend({
  DS: Ember.inject.service('store'),
  //calendarData: null,
  occurrences: Ember.A(),
  //temp: Ember.A(),
  appData: null,
  clientData: null,
  
  clients:[],
  
  bookedApp: [],
  bookedAppLen: Ember.computed.reads('bookedApp.length'),
  
  //init function - populate occurances array 
  init:function(){
      this._super();
      this.get('bookedApp').clear();
      
      // PULL FROM BACKEND 
      // iterate over all appointments and push objects with corresponding startsAt and endsAt times
      this.get('DS').findAll('appointment').then((response)=>{
        
        for (var i=0; i < response.content.length ; i++){
          if(response.content[i]._data.available == true){
              this.get('occurrences').pushObject(Ember.Object.create({
              title: "Available",
              startsAt: response.content[i]._data.startsAt ,
              endsAt: response.content[i]._data.endsAt, 
              appointmentID: response.content[i].id,
            }));
          } 
          else{
            this.get('occurrences').pushObject(Ember.Object.create({
              title: "Booked for Appointment",
              startsAt: response.content[i]._data.startsAt ,
              endsAt: response.content[i]._data.endsAt, 
              appointmentID: response.content[i].id,
              
            }));
            
              this.set('clientData', this.get('DS').peekRecord('appointment', response.content[i].id ).get('client'));
              console.log(this.get('clientData')); //always returns 
              console.log(this.get('clientData').content.data.email); // sometimes null
              
          
              this.get('bookedApp').pushObject(Ember.Object.create({
              appID: response.content[i].id,
              clientID: this.get('clientData').content.id,
              clientName: this.get('clientData').content.data.givenName, 
              clientLastName: this.get('clientData').content.data.familyName, 
              clientEmail: this.get('clientData').content.data.email, 
              clientPhone: this.get('clientData').content.data.phone, 
              clientApp: response.content[i]._data.startsAt,
            }));
          }
            
            
        }
        
        console.log(this.get('bookedApp'));

      });
 
  },


  actions: {

    calendarAddOccurrence: function(occurrence) {
      
      
      //save occurence in backend - appointment 
        this.set('available', true);
 
        var newAvailability = this.get('DS').createRecord('appointment',{
          available: this.get('available'),
          startsAt: occurrence.get('startsAt'),
          endsAt: occurrence.get('endsAt'),
          
        });
        
       
        newAvailability.save().then(response=>{
          // peek to get the id 
          this.get('DS').peekRecord('appointment', response.id);
          // save the occurence in the occurences array so it shows up on the calendar 
          this.get('occurrences').pushObject(Ember.Object.create({
              title: "Available",
              startsAt: occurrence.get('startsAt'),
              endsAt: occurrence.get('endsAt'),
              appointmentID:  response.id,
            }));  
        });
        
        console.log(this.get('occurrences').get('lastObject'));

      
      
    },

    calendarUpdateOccurrence: function(occurrence, properties) {
      occurrence.setProperties(properties);
      console.log("test");
      
      // // updating it in backend  - BREAKS THE SERVER 
      // var startTime = properties.startsAt;
      // var endTime = properties.endsAt;
      
      // // find it - update it 
      // this.get('DS').findRecord('appointment', occurrence.appointmentID ,{backgroundReload:false}).then(function(appointment) {
      //   appointment.get('startsAt');
      //   appointment.get('endsAt');
      //   appointment.set('startsAt', startTime);
      //   appointment.set('endsAt', endTime);
      //   appointment.save();
      //         //appointment.update();
      // });
      
      
      
      
      // delete it 
      this.get('DS').findRecord('appointment', occurrence.appointmentID ,{backgroundReload:false}).then(function(appointment) {
              appointment.destroyRecord();
      });
      
      // push a new one 
      this.set('available', true);
        var newAvailability = this.get('DS').createRecord('appointment',{
          available: this.get('available'),
          startsAt: occurrence.get('startsAt'),
          endsAt: occurrence.get('endsAt'),
          
        });
        
       
        newAvailability.save().then(response=>{
          // peek to get the id 
          this.get('DS').peekRecord('appointment', response.id);
          // save the occurence in the occurences array so it shows up on the calendar 
          this.get('occurrences').pushObject(Ember.Object.create({
              title: "Available",
              startsAt: occurrence.get('startsAt'),
              endsAt: occurrence.get('endsAt'),
              appointmentID:  response.id,
            }));  
        });
        
    },

    calendarRemoveOccurrence: function(occurrence) {
      this.get('occurrences').removeObject(occurrence);
      
      this.get('DS').findRecord('appointment', occurrence.appointmentID ,{backgroundReload:false}).then(function(appointment) {
              appointment.destroyRecord();
          });
      
    },
    
    
    
  }
});
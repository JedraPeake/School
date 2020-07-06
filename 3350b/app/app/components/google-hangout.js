import Component from '@ember/component';

export default Component.extend({
    
   DS: Ember.inject.service('store'),
    currClientData: null,

    
    init:function(){
      this._super();
    //   var identity = localStorage.getItem('id');
    //   this.set('currentID', identity);
    //   console.log(identity);
    //   this.set('currentID', this.get('DS').findRecord('client', identity));
    
   // var clientID;
   
   //filter app by clients 
   
   //find all clients - then query for id and get app
    //  this.get('DS').findRecord('client', '5abd2ad7a73881af3c2edba1', {include: 'appointments'}).then((response)=>{
    //     console.log(response.data);
    //     response.get('appointments').then((result)=>{ 
    //         console.log(result);
            
    //     })
    //  });
     
     
     
        
    // this.get('DS').query('client', {
    //     filter: {
    //       client: occurrence.get('appointment')
    //     }
        
    //   }).then((response)=>{
        
    //   }
        
        // for (var i=0; i < response.content.length ; i++){
        //       if(response.content[i]._data.available == false){
        //       this.get('occurrences').pushObject(Ember.Object.create({
        //       title: "Your Appointment",
        //       startsAt: response.content[i]._data.startsAt ,
        //       endsAt: response.content[i]._data.endsAt, 
        //       appointmentID: response.content[i].id,
        //     }));
        //   }
        // }
        

     
      
    // find all appointment records - loop through to get the client id stored 
    // this.get('DS').findAll('appointment', {include: 'client'}).then((response)=>{
        
    //     console.log(response);
    //     // response.get('client').then((result)=>{ 
    //     //     console.log(result);
            
    //     // });
        
    //     // for (var i=0; i < response.content.length ; i++){
    //     //     //console.log(response.content[i]._data.client.id);
    //     //       if(response.content[i]._data.client == '5abd2ad7a73881af3c2edba1'){
    //     //       // print all appointments 
    //     //       console.log('im inside if');
    //     //       console.log(response.content[i]._data);
    //     //   }
    //     // }
        

    //   });
    
   
      
         //this.set('currClientData', this.get('DS').findRecord('client', '5abd2ad7a73881af3c2edba1'));
         
       //  console.log(this.currClientData.email);

    //   this.get('DS').findRecord('client', '5abd2ad7a73881af3c2edba1').then((response)=>{
    //     this.set('clientID', response.id);
    //     console.log(this.get('clientID'));

        
    //   });
     
    //   console.log(this.get('clientID'));
      
    },
    
    
    
    
    
});

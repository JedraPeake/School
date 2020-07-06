import Component from '@ember/component';

export default Component.extend({
      DS: Ember.inject.service('store'),
        paymentsArray: [],
        paymentsArrayLength: Ember.computed.reads('paymentsArray.length'),
        clientData: null,
        currentClientID: null,
  
      
    init:function(){
      this._super();
      this.get('paymentsArray').clear();
      var identity = localStorage.getItem('currentClientID');
      this.set('currentClientID', identity);
      
      // loop throough all payments to find current client
      this.get('DS').findAll('payment').then((response)=>{
          for (var i=0; i < response.content.length ; i++){
              console.log('inside big for loop');
              console.log(response.content[i].id);
              // peek each client record that made a payment  and compare id to currentClientID
            this.set('clientData', this.get('DS').peekRecord('payment', response.content[i].id ).get('client'));
            var checkClientID = this.get('clientData').content.id ;
            console.log(checkClientID); // works 
             if(checkClientID== this.get('currentClientID')){
                  console.log('inside first if statement - client found');
                 // found the client - save their payments in array 
                 
                 // figure what package first then save 
                 
                 // payment package - 350
                 if (response.content[i]._data.threefifty){
                   this.get('paymentsArray').pushObject(Ember.Object.create({
                        // clientID: this.get('clientData').content.id,
                        // clientName: this.get('clientData').content.data.givenName, 
                        // clientLastName: this.get('clientData').content.data.familyName, 
                        // clientEmail: this.get('clientData').content.data.email, 
                        // clientPhone: this.get('clientData').content.data.phone, 
                        clientPaymentDate: response.content[i]._data.dayTimeStamp,
                        clientPaymentAmount: '350 package',
                    }));
                 }
                 
                 // payment package - 150
                 else if (response.content[i]._data.onefifty){
                   this.get('paymentsArray').pushObject(Ember.Object.create({
                        // clientID: this.get('clientData').content.id,
                        // clientName: this.get('clientData').content.data.givenName, 
                        // clientLastName: this.get('clientData').content.data.familyName, 
                        // clientEmail: this.get('clientData').content.data.email, 
                        // clientPhone: this.get('clientData').content.data.phone, 
                        clientPaymentDate: response.content[i]._data.dayTimeStamp,
                        clientPaymentAmount: '150 package',
                    }));
                 }
                 
                 // payment package - 750
                 else if (response.content[i]._data.seventyfive){
                   this.get('paymentsArray').pushObject(Ember.Object.create({
                        // clientID: this.get('clientData').content.id,
                        // clientName: this.get('clientData').content.data.givenName, 
                        // clientLastName: this.get('clientData').content.data.familyName, 
                        // clientEmail: this.get('clientData').content.data.email, 
                        // clientPhone: this.get('clientData').content.data.phone, 
                        clientPaymentDate: response.content[i]._data.dayTimeStamp,
                        clientPaymentAmount: '750 package',
                    }));
                 }
                 // payment package - 550
                 else if (response.content[i]._data.fivefifty){
                   this.get('paymentsArray').pushObject(Ember.Object.create({
                        // clientID: this.get('clientData').content.id,
                        // clientName: this.get('clientData').content.data.givenName, 
                        // clientLastName: this.get('clientData').content.data.familyName, 
                        // clientEmail: this.get('clientData').content.data.email, 
                        // clientPhone: this.get('clientData').content.data.phone, 
                        clientPaymentDate: response.content[i]._data.dayTimeStamp,
                        clientPaymentAmount: '550 package',
                    }));
                 }
                    
             }
          }
      })
    //   this.set('paymentData', this.get('DS').findAll('payment'));
      
    //   console.log(this.get('paymentData'));
      
    },
    
});

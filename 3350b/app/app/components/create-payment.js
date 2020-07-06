import Component from '@ember/component';
import Ember from 'ember';
export default Component.extend({
    DS: Ember.inject.service('store'),

    actions: {
        
        threeFiftyButton () {
            var confirmID = localStorage.getItem('currentNewAccountID');
            var currentPaymentUser = this.get('DS').peekRecord('client', confirmID);
            
            this.set('threefifty', true);
            var threefiftybutton = this.get('DS').createRecord('payment', {
                        threefifty: this.get('threefifty'), //works
                        dayTimeStamp: new Date()
            });
                    
            threefiftybutton.save().then(response =>{ //works!!
                        console.log(response.id); // payment ID
                        this.get('DS').findRecord('payment', response.id).then((rec)=>{
                            rec.set('client', currentPaymentUser); // client posts 
                            rec.save();
                        })
                        // console.log('550');
                        
                    });
            
        },
        
        fiftyFiveButton () {
            var confirmID = localStorage.getItem('currentNewAccountID');
            var currentPaymentUser = this.get('DS').peekRecord('client', confirmID);
            
            this.set('fivefifty', true);
            var fiftyfivebutton = this.get('DS').createRecord('payment', {
                        fivefifty: this.get('fivefifty'), //works
                        dayTimeStamp: new Date()
            });
                    
            fiftyfivebutton.save().then(response =>{ //works!!
                        console.log(response.id); // payment ID
                        this.get('DS').findRecord('payment', response.id).then((rec)=>{
                            rec.set('client', currentPaymentUser); // client posts 
                            rec.save();
                        })
                        // console.log('550');
                        
                    });
        },
        
        oneFiftyButton () {
            var confirmID = localStorage.getItem('currentNewAccountID');
            var currentPaymentUser = this.get('DS').peekRecord('client', confirmID);
            
            this.set('onefifty', true);
            var onefiftybutton = this.get('DS').createRecord('payment', {
                        onefifty: this.get('onefifty'), //works
                        dayTimeStamp: new Date()
            });
                    
            onefiftybutton.save().then(response =>{ //works!!
                        console.log(response.id); // payment ID
                        this.get('DS').findRecord('payment', response.id).then((rec)=>{
                            rec.set('client', currentPaymentUser); // client posts 
                            rec.save();
                        })
                        // console.log('550');
                        
                    });
            
        },
        
        seventyFiveButton () {
            var confirmID = localStorage.getItem('currentNewAccountID');
            var currentPaymentUser = this.get('DS').peekRecord('client', confirmID);
            
            this.set('seventyfive', true);
            var seventyfivebutton = this.get('DS').createRecord('payment', {
                        seventyfive: this.get('seventyfive'), //works
                        dayTimeStamp: new Date()
            });
                    
            seventyfivebutton.save().then(response =>{ //works!!
                        console.log(response.id); // payment ID
                        this.get('DS').findRecord('payment', response.id).then((rec)=>{
                            rec.set('client', currentPaymentUser); // client posts 
                            rec.save();
                        })
                        // console.log('550');
                        
                    });
            
        },
        

    
    
    deleteAccount() {
    
    console.log('gets here');
        
        var confirmID = localStorage.getItem('currentNewAccountID');
        console.log(confirmID);
        
        this.get('DS').findRecord('client', confirmID,{backgroundReload:false}).then(function(client) {
        client.destroyRecord();
        console.log("it deleted it ok");
    })
    }
    }
      
});


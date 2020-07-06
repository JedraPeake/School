import Component from '@ember/component';

export default Component.extend({
    
    DS: Ember.inject.service('store'),
    
    //GENERAL INFO
    accountData: null,
    familyName: Ember.computed.oneWay('accountData.familyName'),
    givenName: Ember.computed.oneWay('accountData.givenName'),
    DOB: Ember.computed.oneWay('accountData.dofB'),
    email: Ember.computed.oneWay('accountData.email'),
    phone: Ember.computed.oneWay('accountData.phone'),
    postalCode: Ember.computed.oneWay('accountData.postalCode'),
    occupation: Ember.computed.oneWay('accountData.occupation'),
    status: Ember.computed.oneWay('accountData.status'),
    
    init:function(){
        this._super();
        
    },
    
    actions: {
        
    ConfirmGeneralModal() {
        console.log('gets here');
        
        var confirmID = localStorage.getItem('currentNewAccountID');
        console.log(confirmID);
        
        this.set('accountData', this.get('DS').findRecord('client', confirmID));

        this.get('DS').findRecord('client', confirmID).then((rec) =>{
        console.log(rec);
        console.log('gets here too');

            rec.get('familyName');
            rec.get('givenName');
            rec.get('dofB');
            rec.get('email');
            rec.get('phone');
            rec.get('postalCode');
            rec.get('occupation');
            rec.get('status');
            
            
            rec.set('familyName', this.get('familyName') );
            rec.set('givenName', this.get('givenName') );
            rec.set('dofB', this.get('dofB') );
            rec.set('email', this.get('email') );
            rec.set('phone', this.get('phone') );
            rec.set('postalCode', this.get('postalCode') );
            rec.set('occupation', this.get('occupation') );
            rec.set('status', this.get('status') );
            
            rec.save().then(()=>{
              return true;
   
            });
          });
      },
      
    
    
 
    deleteAccount() {
    
        var confirmID = localStorage.getItem('currentNewAccountID');
    
        
        this.get('DS').findRecord('client', confirmID,{backgroundReload:false}).then(function(client) {
        client.destroyRecord();
        console.log("it deleted it ok");
    })
    }
    
      
      
    
    }
});



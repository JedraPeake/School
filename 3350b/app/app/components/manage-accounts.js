import Ember from 'ember';

export default Ember.Component.extend({
  isUsersShowing: true,
  isFeatureEditing: false,
  isRolesEditing: false,
  ADM01IsPermitted: Ember.computed(function(){ //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ADM01") >= 0);
    }
  }),

  didInsertElement() {
    Ember.$(document).ready(function(){
      Ember.$('.ui .item').on('click', function() {
        Ember.$('.ui .item').removeClass('active');
        Ember.$(this).addClass('active');
      });


    });
  },

  actions: {
    manageUsers () {
      this.set('isUsersShowing', true);
      this.set('isFeaturesEditing', false);
      this.set('isRolesEditing', false);


    },
    manageRoles (){
      this.set('isUsersShowing', false);
      this.set('isFeaturesEditing', false);
      this.set('isRolesEditing', true);

    },

    manageFeatures (){
      this.set('isUsersShowing', false);
      this.set('isFeaturesEditing', true);
      this.set('isRolesEditing', false);


    }


  }
});


// import Component from '@ember/component';

// export default Component.extend({
     
//     DS: Ember.inject.service('store'),
//     clientData: null,
//     searchVal:null,
//     currentID:null,
//     userData:null,
//     familyName: null,
//     givenName: null,
//     email: null,
//     DOB: null,
//     postalCode: null,
//     phone: null,
//     occupation: null,
//     filterTreatments: null,
    
//     viewProfile: false,
    
//     init:function(){
//       this._super();
//       this.set('clientData', this.get('DS').findAll('client'));
//     },
    
//     // ready:function(){
//     //     this._super(...arguments);
//     //     Ember.$('#clientTable').DataTable();
//     // },
    
//     // didRender(){
//     //     this._super(...arguments);
//     //     Ember.$('#clientTable').DataTable();
//     // },
    
//     actions: {
//       profileClicked: function () {
//         this.set('viewProfile', true);
//       },
      
//       searched: function(){
//         this.set('searchVal',this.get('search'));
//         console.log(this.get('searchVal'));
//       },
      
//       checkSearch: function(_client){
//         retVal:false;
//         if(this.get('searchVal')==null||_client.familyName==this.get('searchVal')||_client.givenName==this.get('searchVal')){
//           this.set('retVal',true);
//         }
//         return this.get('retVal');
//       },
      
//       profileDone: function () {
//         this.set('viewProfile', false);
//       },
      
//       loadProfile: function(id, familyName, givenName, email, DOB, postalCode, phone, occupation){
//         this.set('currentID', id);
//         this.set('viewProfile', true);
//         this.set('familyName', familyName);
//         this.set('givenName', givenName);
//         this.set('email', email);
//         this.set('DOB', DOB);
//         this.set('postalCode', postalCode);
//         this.set('phone', phone);
//         this.set('occupation', occupation);
        
//         this.set('filterTreatments', this.get('DS').query('treatment', {filter: {client: this.get('currentID')}}));
        
//       },
      
//       updateTreatments: function(){
//         this.set('filterTreatments', this.get('DS').query('treatment', {filter: {client: this.get('currentID')}}));
//       }
//     },
// });

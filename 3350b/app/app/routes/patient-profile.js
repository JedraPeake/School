import Route from '@ember/routing/route';

export default Route.extend({
    beforeModel() {
    if (this.get('oudaAuth').get('isAuthenticated')=== false) {
      this.transitionTo('landing-page');
    }
  },
     model() {
        // var self = this;
        //  this.get('store').queryRecord('client', {givenName:"Dwight"}).then(function(client){
        //     let givenName = client.get('givenName');
        //     console.log('${givenName}');
        //     self.set('title', client.get('givenName')); 
        //  })
         
        // // return this.get('store').findRecord('client', 1);
        // // GET to /persons?filter[name]=Peter
        // this.get('store').query('client', {
        //   filter: {
        //     givenName: 'Dwight'
        //   }
        // }).then(function(client) {
        //     console.log(clien);
        //   console.log('success');
        // });
    }
});

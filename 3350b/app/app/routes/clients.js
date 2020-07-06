import Route from '@ember/routing/route';
// import localStorage from "localStorage";

export default Route.extend({
    beforeModel() {
        if (this.get('oudaAuth').get('isAuthenticated')=== false) {
          this.transitionTo('landing-page');
        }
    },
    
    client: true,
    model(){
        return this.store.findAll('client');
    },
    
    afterModel(){
        this.store.findAll('rehabilitation');
        this.store.findAll('treatment');
        this.store.findAll('form');
        this.store.findAll('question');
       this.store.findAll('appointment');

    },
    
    actions: {
      profile: function () {
        this.set('client', true);
      },
    
    
    }
    
});


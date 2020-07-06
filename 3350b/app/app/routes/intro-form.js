import Route from '@ember/routing/route';

export default Route.extend({
    beforeModel() {
    if (this.get('oudaAuth').get('isAuthenticated')=== false) {
      this.transitionTo('landing-page');
    }
    },
    model(){
        return this.store.findRecord('form','5aba6b62aca2eb182948450d');
    },
    afterModel(){
         this.store.findAll('question');
        return this.store.findAll('type');
    }
});

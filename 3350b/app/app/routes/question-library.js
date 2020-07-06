import Route from '@ember/routing/route';

export default Route.extend({
    beforeModel() {
    if (this.get('oudaAuth').get('isAuthenticated')=== false) {
      this.transitionTo('landing-page');
    }
  },  
      
      model () {
	  return this.store.findAll('question');
  },
  
  afterModel() {
    this.store.findAll('type');
  },
  
  didRender(){
        this._super(...arguments);
        Ember.$('#questTable').DataTable();
  },
  
  
});

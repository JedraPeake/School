import Route from '@ember/routing/route';

export default Route.extend({
    DS: Ember.inject.service('store'),
    selectedType:null,
     model () {
	  return this.store.findAll('form');
  },
   afterModel() {
    this.store.findAll('question');
  },
    
});


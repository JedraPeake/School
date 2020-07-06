import Route from '@ember/routing/route';

// export default Route.extend({
//     model () {
// 		return this.store.findAll('question');
//   },
//     actions: {
//     deleteQuestion: function() {
//             this.get('model').destroyRecord();
//     //   this.get('model').then(function(item) {
//     //             item.destroyRecord();
//     //         })
//     //       console.log("delete?");  
//     }
//   }
	
// });


export default Route.extend({
  DS: Ember.inject.service('store'),

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
  
});

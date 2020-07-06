import Component from '@ember/component';

export default Component.extend({
    
    DS: Ember.inject.service('store'),
    exerciseData: null,
    currentID:null,
    ID: null,
    name:null,
    description: null,
    objectives: null,
    authorName: null,
    authorSteps: null,
    location: null,
    frequency: null,
    duration: null,
    exData: null,
    filterImages: null,
    sets: null,
    reps: null,

    viewExercise: false,
    init:function(){
      this._super();
      this.set('exerciseData', this.get('DS').peekAll('exercise'));
    },
    
    didRender(){
        this._super(...arguments);
        Ember.$('#example').DataTable();
    },
    
    actions: {
      
      profileClicked: function () {
        this.set('viewExercise', true);
      },  
      
      profileDone: function () {
        this.set('viewExercise', false);
      },
      
      loadExercise: function(id, name, description, objectives, authorName, authorSteps, location, frequency, duration, reps){
        this.set('viewExercise', true);
        this.set('currentID', id);
        this.set('name', name);
        this.set('description', description);
        this.set('objectives', objectives);
        this.set('authorName', authorName);
        this.set('authorSteps', authorSteps );
        this.set('location', location);
        this.set('frequency', frequency);
        this.set('sets', frequency);
        this.set('duration', duration);
        this.set('reps', reps);
        this.set('filterImages', this.get('DS').query('image', {filter: {exercise: this.get('currentID')}}));
      },
      
      
      // addExercise: function(id) {
      //   this.set('ID', id);
        
      //   },
      
    }
});

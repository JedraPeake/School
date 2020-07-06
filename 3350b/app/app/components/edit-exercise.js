import Component from '@ember/component';
import fileObject from "../utils/file-object";
export default Component.extend({
  DS: Ember.inject.service('store'),
  
  exerciseData: null,
  name: Ember.computed.oneWay('exerciseData.name'),
  authorName: Ember.computed.oneWay('exerciseData.authorName'),
  description: Ember.computed.oneWay('exerciseData.description'),
  objectives: Ember.computed.oneWay('exerciseData.objectives'),
  location: Ember.computed.oneWay('exerciseData.location'),
  frequency: Ember.computed.oneWay('exerciseData.frequency'),
  duration: Ember.computed.oneWay('exerciseData.duration'),
  reps: Ember.computed.oneWay('exerciseData.reps'),
  authorSteps: Ember.computed.oneWay('exerciseData.authorSteps'),
  multimediaURL: Ember.computed.oneWay('exerciseData.multimediaURL'),
  
  editimagesData: null,
  model: 'image',
  flag: null,
  accept: 'audio/*,video/*,image/*',
  multiple: true,
  queue: [],
  savingInProgress: false,
  
  labelArray: [
    'height: 6.25em',
    'line-height: 5.25em',
    'text-align: center',
  ],

  inputStyle: Ember.computed(function () {
    let style_array = [
      'opacity: 0',
      'width:100% !important',
      'overflow:hidden',
      'position:relative',
      'left:-100%',
      'display:block',
    ];
    return Ember.String.htmlSafe(style_array.join(';'));
  }),

  labelStyle: Ember.computed('labelArray', function () {
    return Ember.String.htmlSafe(this.get('labelArray').join(';'));
  }),


  dragLeave: function (event) {
    event.preventDefault();
    this.set('labelArray', [
      'height: 6.25em',
      'line-height: 5.25em',
      'text-align: center',
    ]);
    return this.set('dragClass', 'deactivated');
  },

  dragOver: function () {
    this.set('labelArray', [
      'height: 6.25em',
      'line-height: 5.25em',
      'text-align: center',
      'background: green',
    ]);
  },

  drop: function () {
    this.set('labelArray', [
      'height: 6.25em',
      'line-height: 5.25em',
      'text-align: center',
    ]);
  },
                        
  editExModal: Ember.computed(function () {
    return 'editExercise' + this.get('ID');
  }),

  actions: {
    openEditExModal: function () {
      this.set('exerciseData', this.get('DS').peekRecord('exercise', this.get('ID')));
      this.set('editimagesData', this.get('DS').query('image', {filter: {exercise: this.get('ID')}}));

      Ember.$('.ui.' + this.get('editExModal') + '.modal').modal({
        closable: false,
        transition: 'horizontal flip',
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          this.get('DS').findRecord('exercise', this.get('ID')).then((rec) =>{
            rec.get('name');
            rec.get('authorName');
            rec.get('description');
            rec.get('objectives');
            rec.get('authorSteps');
            rec.get('location');
            rec.get('frequency');
            rec.get('duration');
            rec.get('reps');
            
            rec.set('name', this.get('name') );
            rec.set('authorName', this.get('authorName') );
            rec.set('description', this.get('description') );
            rec.set('objectives', this.get('objectives') );
            rec.set('authorSteps', this.get('authorSteps') );
            rec.set('location', this.get('location') );
            rec.set('frequency', this.get('frequency') );
            rec.set('duration', this.get('duration') );
            rec.set('reps', this.get('reps') );
            
            rec.save().then(()=>{
              
              //save all the NEWLY ADDED images code
              this.set('savingInProgress', true);
                let counter = 0;
                this.get('queue').forEach(file => {
                  if (file.isDisplayableImage) {
                    var newFile = this.get('DS').createRecord(this.get('model'), {
                      name: file.name,
                      size: file.size,
                      type: file.type,
                      rawSize: file.rawSize,
                      imageData: file.base64Image,
                      exercise: this.get('exerciseData'),
                    });
                    newFile.save().then(() => {
                      counter++;
                      if (this.get('queue').length == counter) {
                        this.get('queue').clear();
                        this.set('flag', false);
                        this.set('savingInProgress', false);
                      }
                    });
                  } else{
                    counter++;
                  }
                });
              
              return true;
            });
          });
        }
      })
        .modal('show');
    },
    
    selectFile: function (data) {
        if (!Ember.isEmpty(data.target.files)) {
          for (let i = data.target.files.length - 1; i >= 0; i--) {
            let file = fileObject.create({
              fileToUpload: data.target.files[i],
              maximumFileSize: 6
            });
            this.get('queue').pushObject(file);
          }
        }
      },
      
      deleteFile: function (file) {
        this.get('queue').removeObject(file);
        if (Ember.isEmpty(this.get('queue'))) {
          this.set('flag', false);
        }
      },
  
      deleteAllFiles: function () {
        this.get('queue').clear();
        this.set('flag', false);
      },
  
      done: function () {
        this.get('queue').clear();
        this.set('flag', false);
      },
      
      deleteImageFromDB: function (imageID) {
        this.get('DS').findRecord('image', imageID,{backgroundReload:false}).then(function(post) {
            post.destroyRecord();
        });
      
      }
      
  },
});
import Component from '@ember/component';
import fileObject from "../utils/file-object";
export default Component.extend({
  DS: Ember.inject.service('store'),
  
  model: 'clientimage',
  flag: null,
  accept: 'audio/*,video/*,image/*',
  multiple: true,
  queue: [],
  savingInProgress: false,
  // currentEx: null,
  currClientData: null,
  currentID: null,
  filterImages: null,
  uploaded: false,

    init:function(){
      this._super();
      console.log('currentNewAccountID');
      var identity = localStorage.getItem('currentNewAccountID');
      this.set('currentID', identity);
      console.log(this.get('currentID'));
      this.set('currClientData', this.get('DS').findRecord('client', localStorage.getItem('currentNewAccountID')));
      var identity = localStorage.getItem('id');
      this.set('currClientData', identity);
      console.log(identity);
          this.set('filterImages', this.get('DS').query('clientimage', {filter: {client: this.get('currentID')}}));

    },

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
    
    actions: {
        
        openExModal: function () {
            this.set('name', null);
            this.set('author', null);
            this.set('description', null);
            this.set('objectives', null);
            this.set('steps', null);
            this.set('location', null);
            this.set('frequency', null);
            this.set('duration', null);
            this.set('date', null);
            this.set('url', null);
            this.set('reps', null);
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
      saveAllFiles: function () {
        var identity = localStorage.getItem('currentNewAccountID');
      console.log(identity);
      this.get('DS').peekRecord('client', localStorage.getItem('currentNewAccountID'));

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
            client:  this.get('DS').peekRecord('client', localStorage.getItem('currentNewAccountID')),
            
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
         this.set('uploaded', true); 
      },
  
      done: function () {
        this.get('queue').clear();
        this.set('flag', false);
      }
        
    }
    
}); 

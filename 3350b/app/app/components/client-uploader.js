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
  items: [
    {
      src: 'https://lorempixel.com/1024/768/nature/1',
      w: 1024,
      h: 768,
    },
    {
      src: 'https://lorempixel.com/768/1024/nature/2',
      w: 768,
      h: 1024,
    },
    {
      src: 'https://lorempixel.com/768/768/nature/3',
      w: 768,
      h: 768,
    },
  ],

    init:function(){
      this._super();
      //localStorage.setItem('id','5ac22e6566f776869c678ff4');
       var identity = localStorage.getItem('currentClientID');
      this.set('currentID', identity);
      this.set('currClientData', this.get('DS').findRecord('client', localStorage.getItem('currentClientID')));
       var identity = localStorage.getItem('currentClientID');
      this.set('currClientData', identity);
      console.log(identity);
          this.set('filterImages', this.get('DS').query('clientimage', {filter: {client: this.get('currentID')}}));

    },
    
  //     getUser: Ember.computed(function () {
  //   var userID = this.get('client');
  //   var myStore = this.get('store');
  //   var self = this;
  //   myStore.queryRecord('password', {filter: {userName: userID}}).then(function (userShadow) {
  //     myStore.find('client', userShadow.get('user').get('id')).then(function (user) {
  //       self.set('userProfile', user);
  //       //alert(user.id);
  //       console.log('yoooo');
  //       console.log(user.id);
  //       return self.get('userProfile');
  //     });
  //   });

  // }),
  

  labelArray: [
    'height: 6.25em',
    'line-height: 5.25em',
    'text-align: center',
  ],
  
  items: [
    {
      src: 'http://lorempixel.com/1024/768/nature/1',
      w: 1024,
      h: 768,
    },
    {
      src: 'http://lorempixel.com/768/1024/nature/2',
      w: 768,
      h: 1024,
    },
    {
      src: 'http://lorempixel.com/768/768/nature/3',
      w: 768,
      h: 768,
    },
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
        var identity = localStorage.getItem('currentClientID');
      console.log(identity);
      this.get('DS').peekRecord('client', localStorage.getItem('currentClientID'));

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
            client:  this.get('DS').peekRecord('client', localStorage.getItem('currentClientID')),
            
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

import Route from '@ember/routing/route';
import fileObject from "../utils/file-object";

export default Route.extend({
    
    DS: Ember.inject.service('store'),
    currentID: null,
        filterImages: null,

    beforeModel() {
      if (this.get('oudaAuth').get('isAuthenticated')=== false) {
        this.transitionTo('landing-page');
      }
    },
    init:function(){
      this._super();
      var identity = localStorage.getItem('currentClientID');
      this.set('currentID', identity);
      console.log(identity);
    this.set('filterImages', this.get('DS').query('clientimage', {filter: {client: this.get('currentID')}}));
    console.log(this.filterImages)
    //search the images based on id 

      //this.set('currentID', this.get('DS').findRecord('client', this.get('ID')));
    },
    
    
//     DS: Ember.inject.service('store'),
//     model: 'image',
//     flag: null,
//     accept: 'audio/*,video/*,image/*',
//     multiple: true,
//     queue: [],
//     savingInProgress: false,
//     currentEx: null,

//   labelArray: [
//     'height: 6.25em',
//     'line-height: 5.25em',
//     'text-align: center',
//   ],

//   inputStyle: Ember.computed(function () {
//     let style_array = [
//       'opacity: 0',
//       'width:100% !important',
//       'overflow:hidden',
//       'position:relative',
//       'left:-100%',
//       'display:block',
//     ];
//     return Ember.String.htmlSafe(style_array.join(';'));
//   }),

//   labelStyle: Ember.computed('labelArray', function () {
//     return Ember.String.htmlSafe(this.get('labelArray').join(';'));
//   }),


//   dragLeave: function (event) {
//     event.preventDefault();
//     this.set('labelArray', [
//       'height: 6.25em',
//       'line-height: 5.25em',
//       'text-align: center',
//     ]);
//     return this.set('dragClass', 'deactivated');
//   },

//   dragOver: function () {
//     this.set('labelArray', [
//       'height: 6.25em',
//       'line-height: 5.25em',
//       'text-align: center',
//       'background: green',
//     ]);
//   },

//   drop: function () {
//     this.set('labelArray', [
//       'height: 6.25em',
//       'line-height: 5.25em',
//       'text-align: center',
//     ]);
//   },
    
//     actions: {
        
//       selectFile: function (data) {
//         if (!Ember.isEmpty(data.target.files)) {
//           for (let i = data.target.files.length - 1; i >= 0; i--) {
//             let file = fileObject.create({
//               fileToUpload: data.target.files[i],
//               maximumFileSize: 6
//             });
//             this.get('queue').pushObject(file);
//           }
//         }
//       },
      
//       deleteFile: function (file) {
//         this.get('queue').removeObject(file);
//         if (Ember.isEmpty(this.get('queue'))) {
//           this.set('flag', false);
//         }
//       },
  
//       deleteAllFiles: function () {
//         this.get('queue').clear();
//         this.set('flag', false);
//       },
  
//       done: function () {
//         this.get('queue').clear();
//         this.set('flag', false);
//       }
        
//     }
    
}); 

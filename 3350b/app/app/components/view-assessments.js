import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    rehabilitationData: Ember.A(),
    rehabilitationData2: Ember.A(),
    assessmentData:[],
    rehabString:null,
    
    viewMore: false,
    selectedEx: false,
    filterImages: null,
    
    init:function(){
      this._super();
      var component = this;
      var rehabilitationData2 = [];
      
      this.get('DS').query('treatment', {filter: {client: localStorage.getItem('id')}} ).then(response =>{
        var lengthFor = response.content.length;
        for(var i=0; i< lengthFor; i++ ){
            this.get('DS').findRecord('treatment', response.content[i].id, {include: 'rehabiliation'} ).then(response=>{
              //console.log(response);
                response.get('rehabilitation').then((result)=>{  
                  //console.log(component);
                  component.set( 'rehabilitation',result);
  
                  this.get('rehabilitationData').pushObject(component.rehabilitation);
                  rehabilitationData2.pushObject(component.rehabilitation);
                  
                  var currRehab = this.get('DS').peekRecord('rehabilitation', component.rehabilitation.id);
                  console.log(currRehab);
                  this.get('rehabilitationData2').pushObject(currRehab);
                  
                });
                
            });
            
            
        }
        
      });
      
    
      
      
    },
    
    actions: {
      loadMore: function(idCurr){
        this.set('viewMore', true);
        var currEx = this.get('DS').peekRecord('assessmentTests', idCurr);
        this.set('selectedEx', currEx);
        this.set('filterImages', this.get('DS').query('image', {filter: {assessment: idCurr}}));
        
      },
      
      
      goBack: function(){
        this.set('viewMore', false);
      }
      
    }
});

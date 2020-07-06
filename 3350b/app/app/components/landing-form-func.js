import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    arrayPoint:[],
    selectedCount: Ember.computed.reads('arrayPoint.length'),
    
    init:function(){
      this._super();
      var updateBoxes = this.get('DS').findRecord('landing-box', '5ac264de48f1b66a31f38aa7').then((rec) =>{
          
        this.set('blurb', rec.get('boxBlurb'));
        this.set('arrayPoint', rec.get('boxPoints')); 
      });
      
       
    },
    
    actions:{
        updateBackend: function(){
            var updateBoxes = this.get('DS').findRecord('landing-box', '5ac264de48f1b66a31f38aa7').then((rec) =>{
                rec.get('boxBlurb');
                rec.get('boxPoints')
                rec.set('boxBlurb', this.get('blurb'));
                rec.set('boxPoints', this.get('arrayPoint'));
                rec.save().then(()=>{
                    
                });
            });
                    
                    
            
        },
        
        addBullet: function(){
            console.log(this.get('arrayPoint'))
            this.get('arrayPoint').pushObject(this.get('pointToAdd'))
        },
        
        removeBullet: function(name){
            console.log(name)
            this.get('arrayPoint').removeObject(name)
        }
        
        
        
    }
});

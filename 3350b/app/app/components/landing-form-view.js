import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    boxData:[],
    boxData1:[],
    boxData2:[],
    boxBlurb:null,
    
    
    init:function(){
      this._super();
      this.get('DS').findRecord('landing-box', '5ac264de48f1b66a31f38aa7').then((rec) =>{
        this.set('boxBlurb', rec.get('boxBlurb'));
        this.set('boxData', rec.get('boxPoints')); 
        console.log(this.get('boxData'));
        
        for(var j=0; j<this.get('boxData').length; j++){
          if(j%2==0){
            this.get('boxData1').pushObject(this.get('boxData')[j]);
          }else{
            this.get('boxData2').pushObject(this.get('boxData')[j]);
          }
        }
        
        console.log(this.get('boxData1'));
        console.log(this.get('boxData2'));
        
      });
    },
});

import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return this.store.findAll('landing-box');
    },
    
    // boxdata:null,

    // init:function(){
    //   this._super();
    //   this.set('boxdata', this.get('DS').peekAll('landing-box'));
    // },
});

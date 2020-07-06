import Component from '@ember/component';

export default Component.extend({
    viewNavbar: false,
    actions: {  
      loggingIn: function () {
        this.set('viewNavbar', true);
      },
    }
});

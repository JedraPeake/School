import Component from '@ember/component';

export default Component.extend({
    show:false,
    actions: {
    submit() {
        this.set('show', true)
    }
  }
});

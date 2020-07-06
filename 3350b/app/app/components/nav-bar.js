import Component from '@ember/component';

export default Component.extend({
});

$(' .ui.sidebar')
  .sidebar({
    context: '.bottom.segment'
  })
  .sidebar('attach events');
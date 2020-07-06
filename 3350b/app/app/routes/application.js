import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  userProfile: null,
  user: null,
  userName: null,
  
  beforeModel () {
    var authentication = this.get('oudaAuth');
    authentication.set('isLoginRequested', false);
    var self = this;
    authentication.fetch().then(
      function () {
        self.transitionTo('landing-page');
      },
      function () {
        self.transitionTo('landing-page');
       //console.log("error -->" + error);
      });
  },
  
});

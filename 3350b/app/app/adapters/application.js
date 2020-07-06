import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'https://self-start-project-skananit.c9users.io:8082'
    // actions: {
    // loggedIn: function () {
    //     this.set('viewNavbar', true);
    //   }
    // }
});

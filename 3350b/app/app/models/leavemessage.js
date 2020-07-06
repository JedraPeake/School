import DS from 'ember-data';

export default DS.Model.extend({
    ContactName: DS.attr('string'),
    ContactEmail: DS.attr('string'), // last name in auth
    ContactMessage: DS.attr('string')
    
});
import DS from 'ember-data';

export default DS.Model.extend({
    familyName: DS.attr('string'),
    givenName: DS.attr('string'),
    email: DS.attr('string'),
    dateHired: DS.attr('date'),
    dateFinished : DS.attr('date'),
    forms: DS.hasMany('forms'),
    userAccount: DS.belongsTo('user-account')
 
});

        
   
import DS from 'ember-data';

export default DS.Model.extend({

    //id: DS.attr('string'),
    familyName: DS.attr('string'),
    givenName: DS.attr('string'),
    email: DS.attr('string'),
    dateHired: DS.attr('date'),
    dateFinished : DS.attr('date'),
    treatments: DS.hasMany('treatments'),
    userAccount: DS.belongsTo('user-account')
});
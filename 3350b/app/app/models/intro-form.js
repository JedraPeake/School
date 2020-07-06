import DS from 'ember-data';

export default DS.Model.extend({

    name: DS.attr('string'),
    description: DS.attr('string'),
    authorName: DS.attr('string'),
    testResult: DS.hasMany('test-result'),
    forms: DS.belongsTo('form'),

        
});

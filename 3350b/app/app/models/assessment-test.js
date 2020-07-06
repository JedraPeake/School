import DS from 'ember-data';

export default DS.Model.extend({

    name: DS.attr('string'),
    description: DS.attr('string'),
    authorName: DS.attr('string'),
    rehabilitations: DS.belongsTo('rehabilitation'),
    testResult: DS.hasMany('test-result'),
    recommendation: DS.hasMany('recommendation'),
    forms: DS.belongsTo('form'),

        
});

      
        

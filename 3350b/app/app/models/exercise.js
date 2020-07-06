import DS from 'ember-data';

export default DS.Model.extend({

    name: DS.attr('string'),
    description: DS.attr('string'),
    objectives: DS.attr('string'),
    authorName: DS.attr('string'),
    authorSteps: DS.attr('string'),
    location: DS.attr('string'),
    frequency: DS.attr('number'),
    duration: DS.attr('number'),
    reps: DS.attr('number'),
    target: DS.attr('date'),
    multimediaURL: DS.attr('string'),
    rehabilitationPlans: DS.belongsTo('rehabilitation-plan'),
    images: DS.hasMany('image')
});
 

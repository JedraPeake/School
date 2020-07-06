import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    timeStamp: DS.attr('date'),
    authorName: DS.attr('string'),
    goal: DS.attr('string'),
    timeFrameToComplete: DS.attr('date'),
    exercises: DS.hasMany('exercise'),
    assessmentTests: DS.hasMany('assessment-test'),
    treatments: DS.hasMany('treatment')

});
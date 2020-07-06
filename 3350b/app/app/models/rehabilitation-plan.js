import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    timeStamp: DS.attr('date'),
    authorName: DS.attr('string'),
    goal: DS.attr('string'),
    timeFrameToComplete: DS.attr('string'),
    exercises: DS.hasMany('exercises'),
    assessmentTests: DS.hasMany('assessment-tests'),
    treatments: DS.hasMany('treatments')

});


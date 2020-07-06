import DS from 'ember-data';

export default DS.Model.extend({
    timeStamp: DS.attr('date'),
    decision: DS.attr('string'),
    treatments: DS.belongsTo('treatments'),
    assessmentTests: DS.belongsTo('assessment-tests')
});

    
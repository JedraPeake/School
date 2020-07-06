import DS from 'ember-data';

export default DS.Model.extend({
 questionText: DS.attr('string'),
 helpDescription: DS.attr('string'),
 order: DS.attr('number'),
 isWritten: DS.attr('boolean'),
 isAgree : DS.attr('boolean'),
 isMultiple: DS.attr('boolean'),
 isYes: DS.attr('boolean'),
 type: DS.belongsTo('type', {async: true}),
 //form: DS.belongsTo('form')
});

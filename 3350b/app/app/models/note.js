import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    content: DS.attr('string'),
    date: DS.attr('date'),
    client: DS.belongsTo('client'),
    physiotherapist: DS.belongsTo('physiotherapist')
 
});
import DS from 'ember-data';

export default DS.Model.extend({
    dateAssign: DS.attr('date'),
    client: DS.belongsTo('client'),
    physiotherapist: DS.belongsTo('physiotherapist'),
    rehabilitation: DS.belongsTo('rehabilitation'),
    recommendation: DS.belongsTo('recommendation')
 
});
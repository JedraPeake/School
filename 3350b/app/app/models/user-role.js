import DS from 'ember-data';

export default DS.Model.extend({
    dateAssigned: DS.attr('date'),
    user: DS.belongsTo('client',{ async: true }),
    role: DS.belongsTo('role-code',{ async: true })
});

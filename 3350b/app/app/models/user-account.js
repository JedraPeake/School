import DS from 'ember-data';

export default DS.Model.extend({
    userAccountName: DS.attr('string'),
    encryptedPassword: DS.attr('string'),
    
    physiotherapist: DS.belongsTo('physiotherapist'),
    client: DS.belongsTo('client'),
    administrator: DS.belongsTo('administrator')
    
    
 
});



       
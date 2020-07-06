import DS from 'ember-data';

export default DS.Model.extend({
    //date: DS.attr('date'),
    reason : DS.attr('string'),
    //other : DS.attr('string'),
    available : DS.attr('boolean'),
    startsAt : DS.attr('string'),
    endsAt : DS.attr('string'),
    clinetID : DS.attr('string'),
    client: DS.belongsTo('client')
    

});

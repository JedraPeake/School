import DS from 'ember-data';

export default DS.Model.extend({

    dayTimeStamp: DS.attr('date'),
    note: DS.attr('string'),
    client: DS.belongsTo('client'),
    threefifty: DS.attr('boolean'),
    onefifty: DS.attr('boolean'),
    seventyfive: DS.attr('boolean'),
    fivefifty: DS.attr('boolean'),


});
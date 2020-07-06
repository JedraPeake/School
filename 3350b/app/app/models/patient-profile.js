import DS from 'ember-data';

export default DS.Model.extend({
    familyName: DS.attr('string'),
    givenName: DS.attr('string'),
    email: DS.attr('string'),
    DOB: DS.attr('date'),
    postalCode: DS.attr('string'),
    phone: DS.attr('string'),
    martialStatus: DS.attr('string'),
    occupation: DS.attr('string'),
    others :DS.attr('string'),
    status : DS.attr('string'),
    payments: DS.hasMany('payments'),
    appointment: DS.hasMany('appointments'),
    gender: DS.belongsTo('gender'),
    city: DS.belongsTo('city'),
    province: DS.belongsTo('province'),
    patientCountry: DS.belongsTo('patientCountry'),
    treatments: DS.hasMany('treatments'),
    userAccount: DS.belongsTo('userAccount')
});


        
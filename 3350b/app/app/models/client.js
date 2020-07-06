import DS from 'ember-data';

export default DS.Model.extend({
    familyName: DS.attr('string'),
    givenName: DS.attr('string'), // last name in auth
    email: DS.attr('string'),
    DOB: DS.attr('date'),
    age: DS.attr('number'),
    postalCode: DS.attr('string'),
    phone: DS.attr('string'),
    martialStatus: DS.attr('string'),
    healthCadNumber: DS.attr('string'),
    occupation: DS.attr('string'),
    others :DS.attr('string'),
    payments: DS.hasMany('payment'),
    appointments: DS.hasMany('appointment'),
    gender: DS.belongsTo('gender'),
    city: DS.belongsTo('city'),
    province: DS.belongsTo('province'),
    patientCountry: DS.belongsTo('patientCountry'),
    treatments: DS.hasMany('treatment'),
    finalRep: DS.hasMany('final-report'),
    userAccount: DS.belongsTo('userAccount'),
    notes: DS.hasMany('note'),
    enabled: DS.attr('boolean'),
    userShadow: DS.belongsTo('password',{ async: true }),
    userRoles: DS.hasMany('userRole', { async: true }),
    introForm: DS.belongsTo('intro-form', {async:true})
});
import DS from 'ember-data';

export default DS.Model.extend({

    date: DS.attr('date'),
    patientProfile: DS.hasMany('patient-profile'),
    province: DS.belongsTo('province')
        
});



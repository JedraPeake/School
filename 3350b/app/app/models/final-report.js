import DS from 'ember-data';

export default DS.Model.extend({

    reportName: DS.attr('string'),
    date: DS.attr('date'),
    pdfArray: DS.attr(),
    client: DS.belongsTo('client'),
    final: DS.attr('boolean'),
    summary: DS.attr('boolean'),
    physiotherapist: DS.belongsTo('physiotherapist'),
});
 
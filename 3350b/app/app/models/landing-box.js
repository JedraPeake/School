import DS from 'ember-data';

export default DS.Model.extend({

    box1: DS.attr('boolean'),
    boxPoints: DS.attr(),
    box2: DS.attr('boolean'),
    boxBlurb: DS.attr('string'),
});
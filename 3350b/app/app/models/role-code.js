import DS from 'ember-data';

export default DS.Model.extend({
  // name can be: Admin, Faculty, Staff, etc
  name: DS.attr(),
  userRoles: DS.hasMany('user-role', { async: true }),
  features: DS.hasMany('role-permission', { async: true })
});

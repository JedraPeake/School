//
// This controller is responsible to assign system roles
// to existing users
//
import Ember from 'ember';
export default Ember.Component.extend({
  store: Ember.inject.service(),
  ID: null,
  userRecord: null,
  selectedRole: null,
  userRoleModel: null,
  userRoles: [],
  modalName: Ember.computed(function () {
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return 'assignRole' + this.get('ID');
    } else {
      if (authentication.get('userCList').indexOf("MR001") >= 0) {
        return 'assignRole' + this.get('ID');
      } else {
        return 'access-denied' + this.get('ID');
      }
    }

  }),


  MR001IsPermitted: Ember.computed(function () {
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("MR001") >= 0);
    }
  }),


  roleCodeModel: Ember.computed(function () {
    return this.get('store').findAll('roleCode');
  }),


  actions: {

    openModal: function () {
        var userID = this.get('ID');
        var myStore = this.get('store');
        this.set('userRecord', this.get('store').peekRecord('client', userID));
        var self = this;

        self.set('userRoleModel', []);
        myStore.query('userRole', {filter: {user: userID}}).then(function (roles) {
          roles.forEach(function (oneRole) {
            var roleID = oneRole.get('role').get('id');
            self.get('store').findRecord('roleCode', roleID).then(function (role) {
              self.get('userRoleModel').pushObject(role);

            });
          });

        });

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          detachable: false,
          onDeny: function () {
            Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
          },
          onApprove: function () {
            Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
          }
        })
          .modal('show');


    },


    selectRole: function(role) {
      this.$('.ui.floating.dropdown .text').val('Add User Role');

      var myStore = this.get('store');
      var roleCode = myStore.peekRecord('roleCode', role);

      var roleNotAssigned = this.get('userRoleModel').every(function (oneRole) {
        //   return (role !== oneRole.id);
        return (roleCode.get('id') !== oneRole.id);
      });

      if (roleNotAssigned) {
        this.get('userRoleModel').pushObject(roleCode);
        myStore.createRecord('userRole', {
          dateAssigned: new Date(),
          user: myStore.peekRecord('client', this.get('userRecord').get('id')),
          role: roleCode
        }).save();
      }
    },

    deleteRole: function (id, userID) {
      var myStore = this.get('store');

      var roles = [];

      this.get('userRoleModel').forEach(function (userrole) {
        if (userrole.id !== id) {
          roles.pushObject(userrole);
        }
      });
      this.set('userRoleModel', roles);

      myStore.queryRecord('userRole', {filter: {user: userID, role: id}}).then(function (userRole) {
        userRole.user = null;
        userRole.role = null;
        userRole.save().then(function (toDelete) {
          toDelete.destroyRecord();
        });
      });
    }
  }
});

// //
// // This controller is responsible to assign system roles
// // to existing users
// //
// import Ember from 'ember';
// export default Ember.Component.extend({
//   store: Ember.inject.service(),
//   ID: null,
//   userRecord: null,
//   selectedRole: null,
//   userRoleModel: null,
//   userRoles: [],
//   modalName: Ember.computed(function () {
//     var authentication = this.get('oudaAuth');
//     if (authentication.getName === "Root") {
//       return 'assignRole' + this.get('ID');
//     } else {
//       if (authentication.get('userCList').indexOf("MR001") >= 0) {
//         return 'assignRole' + this.get('ID');
//       } else {
//         return 'access-denied' + this.get('ID');
//       }
//     }

//   }),


//   MR001IsPermitted: Ember.computed(function () {
//     var authentication = this.get('oudaAuth');
//     if (authentication.getName === "Root") {
//       return true;
//     } else {
//       return (authentication.get('userCList').indexOf("MR001") >= 0);
//     }
//   }),

//   userRoleModel: Ember.computed(function () {
//     var userID = this.get('ID');
//     return this.get('store').findAll('role-code', userID);
//   }),
  
//   roleCodeModel: Ember.computed(function () {
//     return this.get('store').findAll('role-code');
//   }),


//   actions: {

//     openModal: function () {
//         var userID = this.get('ID');
//         var myStore = this.get('store');
//         this.set('userRecord', this.get('store').peekRecord('client', userID));
//         var self = this;

//         self.set('userRoleModel', []);
//         myStore.query('userRole', {filter: {client: userID}}).then(function (roles) {
//           roles.forEach(function (oneRole) {
//             var roleID = oneRole.get('role').get('id');
//             self.get('store').findRecord('roleCode', roleID).then(function (role) {
//               self.get('userRoleModel').pushObject(role);

//             });
//           });

//         });

//         Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
//           closable: false,
//           transition: 'horizontal flip',
//           detachable: false,
//           onDeny: function () {
//             Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
//           },
//           onApprove: function () {
//             //Ember.$('.ui.' + self.get('modalName') + '.modal').modal('hide');
//             let _type=self.get('store').peekRecord('role-code',self.get('selectedRole'));
//         console.log(_type);
//                   let newQuest = self.get('store').createRecord('userRole', {
//                         dateAssigned: new Date(),
//                         user: myStore.peekRecord('client', self.get('userRecord').get('id')),
//                         type: _type
//                     });
                   
//                     newQuest.save()
//           }
//         })
//           .modal('show');


//     },


//     selectRole: function(value) {
//       //this.$('.ui.floating.dropdown .text').val('Add User Role');

//       var myStore = this.get('store');
//       var roleCode = myStore.peekRecord('roleCode', value);
//       this.set('selectedRole',value);
      
//       var roleNotAssigned = this.get('userRoleModel').every(function (oneRole) {
//         //   return (role !== oneRole.id);
//         return (roleCode.get('id') !== oneRole.id);
//       });

//       if (roleNotAssigned) {
//         this.get('userRoleModel').pushObject(roleCode);
//         // var newRole = myStore.createRecord('user-role', {
//         //   dateAssigned: new Date(),
//         //   user: myStore.peekRecord('client', this.get('userRecord').get('id')),
//         //   role: roleCode
//         // })
//         // newRole.save();
//       }
//     },

//     deleteRole: function (id, userID) {
//       var myStore = this.get('store');

//       var roles = [];

//       this.get('userRoleModel').forEach(function (userrole) {
//         if (userrole.id !== id) {
//           roles.pushObject(userrole);
//         }
//       });
//       this.set('userRoleModel', roles);

//       myStore.queryRecord('user-role', {filter: {client: userID, role: id}}).then(function (userRole) {
//         userRole.client = null;
//         userRole.role = null;
//         userRole.save().then(function (toDelete) {
//           toDelete.destroyRecord();
//         });
//       });
//     }
//   }
// });

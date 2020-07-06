import Ember from 'ember';
/* global XLSX */

export default Ember.Component.extend({

  store: Ember.inject.service(),
  tableHeader: [],
  tableData: null,
  isLoading: false,
  flag: false,

  ISF01IsPermitted: Ember.computed(function(){
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ISF01") >= 0);
    }
  }),

  actions: {

    fileImported: function (file) {
      this.set('isLoading', true);
      var workbook = XLSX.read(file.data, {type: 'binary'});
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
        if (cellName[0] === '!') {
          continue;
        }
        row = cellName.slice(1) - 1;
        col = cellName.charCodeAt(0) - 65;
        data[size++] = [];
        if (row === 0) {

          header[col] = worksheet[cellName].v;

        } else {
          data[row][col] = worksheet[cellName].v;
        }
      }
      this.set('tableHeader', header);
      this.set('tableData', data);
    },

    save: function () {
      var myStore = this.get('store');
      let features = myStore.peekAll('rolePermission');
      features.forEach(function (oneFeature) {
        oneFeature.set('roleCode', []);
        oneFeature.save().then(function () {
          oneFeature.destroyRecord();
        });
      });

      this.get('tableData').forEach(function (row) {
        if (row[0]) {
          var newRolePermission = myStore.createRecord('rolePermission', {
            code: row[0],
            sysFeature: row[1]
          });
          newRolePermission.save();

        }
      });
      this.set('flag', false); // this makes isDataImporting to be false
    },

    cancel: function () {
      this.set('flag', false); // this makes isDataImporting to be false
    }

  }







});

import Ember from 'ember';

const ObjectAtHelper = Ember.Helper.helper(function([ array, index]) {
  return array[index];
});


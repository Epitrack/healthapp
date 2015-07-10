'use strict';

angular.module('myApp.symptom', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/symptoms', {
    templateUrl: 'symptoms/symptoms.html',
    controller: 'SymptomCtrl'
  });
}])

.controller('SymptomCtrl', function($scope, $http, $routeParams, SymptomItem, $rootScope) {
  $scope.title = 'How are you feeling today?';
  $scope.subtitle = 'Select if you are good or bad.';

  $rootScope.bodylayout = 'body-symptom';

  $scope.sendSymptom = function() {
    $http({
      url: 'http://localhost/test.php',
      data: $scope.form,
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8' } 
    }).success(function(data) {
      console.log('Send symptom!', data);
    }).error(function(err) {
      console.warn('Send symptom failed.', err);
    });
  };

  SymptomItem.getSymptomItem(function(data) {
    $scope.symptoms = data;
  });
})

.factory('SymptomItem', function ($http) {
  var listSymptomItem, obj;
  obj = {};

  obj = {
    getSymptomItem: function(callback) {
      if (listSymptomItem) {
        callback(listSymptomItem);
        return false;
      } else {
        $http({
          method: 'GET',
          url: 'data/symptoms.json'
        }).success(function(data) {
          obj.saveSymptomItem(data);
          callback(data);
        });
      }
    },

    saveSymptomItem: function(data) {
      listSymptomItem = data;
    }
  }

  return obj;
});
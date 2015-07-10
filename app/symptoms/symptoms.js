'use strict';

angular.module('myApp.symptoms', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/symptoms', {
    templateUrl: 'symptoms/symptoms.html',
    controller: 'SymptomsCtrl'
  });
}])

.controller('SymptomsCtrl', function($scope, $http, $routeParams, SymptomsItem, $rootScope, $location) {
  $scope.title = 'How is your health today?';
  $scope.subtitle = 'Select the symptoms you are feeling.';

  $rootScope.bodylayout = 'body-symptoms';

  $scope.sendSymptoms = function() {
    $http({
      url: 'http://localhost/test.php',
      data: $scope.form,
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8' } 
    }).success(function(data) {
      console.log('Send symptoms!', data);
    }).error(function(err) {
      console.warn('Send symptoms failed.', err);
    });
  };

  SymptomsItem.getSymptomsItem(function(data) {
    $scope.symptoms = data;
  });
})

.factory('SymptomsItem', function ($http) {
  var listSymptomsItem, obj;
  obj = {};

  obj = {
    getSymptomsItem: function(callback) {
      if (listSymptomsItem) {
        callback(listSymptomsItem);
        return false;
      } else {
        $http({
          method: 'GET',
          url: 'data/symptoms.json'
        }).success(function(data) {
          obj.saveSymptomsItem(data);
          callback(data);
        });
      }
    },

    saveSymptomsItem: function(data) {
      listSymptomsItem = data;
    }
  }

  return obj;
});
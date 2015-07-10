'use strict';

angular.module('myApp.survey', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/survey', {
    templateUrl: 'survey/survey.html',
    controller: 'SurveyCtrl'
  });
}])

.controller('SurveyCtrl', function($scope, $http, $routeParams, SurveyInternal, $rootScope, $httpParamSerializer) {
  $scope.subtitle = 'How is your health today?';

  $rootScope.bodylayout = 'body-survey';

  $scope.sendSurvey = function() {
    $http({
      url: 'http://localhost/test.php',
      data: $scope.form,
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8' } 
    }).success(function(data) {
      console.log('Send survey!', data);
    }).error(function(err) {
      console.warn('Send survey failed.', err);
    });
  };

  SurveyInternal.getSurveyInternal(function(data) {
    $scope.surveys = data;
  });
})

.factory('SurveyInternal', function ($http) {
  var listSurveyInternal, obj;
  obj = {};

  obj = {
    getSurveyInternal: function(callback) {
      if (listSurveyInternal) {
        callback(listSurveyInternal);
        return false;
      } else {
        $http({
          method: 'GET',
          url: 'data/surveys.json'
        }).success(function(data) {
          obj.saveSurveyInternal(data);
          callback(data);
        });
      }
    },

    saveSurveyInternal: function(data) {
      listSurveyInternal = data;
    }
  }

  return obj;
});
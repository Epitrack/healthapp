'use strict';

angular.module('myApp.survey', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/survey', {
    templateUrl: 'survey/survey.html',
    controller: 'SurveyCtrl'
  });
}])

.controller('SurveyCtrl', function($scope, $http, $routeParams, $rootScope, $httpParamSerializer) {
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
});
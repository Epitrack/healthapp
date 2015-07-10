'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', function($scope, $rootScope, $location) {
  
  $rootScope.bodylayout = 'body-login';

  $scope.go = function(path) {
    $location.path(path);
  };

});
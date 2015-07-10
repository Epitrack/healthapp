'use strict';

angular.module('myApp.thanks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/thanks', {
    templateUrl: 'thanks/thanks.html',
    controller: 'ThanksCtrl'
  });
}])

.controller('ThanksCtrl', function($scope, $rootScope, $location) {
  $scope.message = 'Thanks to participate!';
  $rootScope.bodylayout = 'body-thanks';

  var element = document.querySelector('#mask');
  mask.classList.add('js-show');

  $scope.removeClass = function() {
    mask.classList.remove('js-show');
    $location.path('#/home');
  };

});
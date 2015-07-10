'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.home',
  'myApp.survey',
  'myApp.symptoms',
  'myApp.puzzle',
  'myApp.map',
  'myApp.thanks',
  'myApp.version'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}])

.controller('GeneralCtrl', function ($scope) {
    var menu, mask, button, wrapper;

    menu = document.querySelector('#global-menu');
    mask = document.querySelector('#mask');
    button = document.querySelector('#menu-primary');
    wrapper = document.querySelector('#wrapper-menu');

   $scope.toggleMenu = function() {
    menu.classList.toggle('js-open');
    mask.classList.toggle('js-show');
    button.classList.toggle('js-move');
    wrapper.classList.toggle('js-open');
   }

   $scope.removeMask = function() {
    mask.classList.remove('js-show');
   }
});

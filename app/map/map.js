'use strict';

angular.module('myApp.map', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', function($scope, $rootScope, GetMap) {
  $rootScope.bodylayout = 'body-map';

  GetMap.requestLocation();
})

.factory('GetMap', function ($http) {
  var obj = {} ;

  obj = {
    requestLocation: function() {
      navigator.geolocation.getCurrentPosition(success, error);

      function success(position) {
        var map = new GMaps({
          div: '#show-map',
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        map.addMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          title: 'You here!',
          icon: 'images/icon-map-brasil.png',
          infoWindow: {
            content: '<p>You here!</p>'
          }
        });
      }

      function error(err) {
        console.warn('Error to request location', err);
      }
    },

    requestMarkers: function() {}
  }

  return obj;
});
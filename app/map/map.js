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
  // GetMap.requestMarkers();
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

    requestMarkers: function() {
      $http({
        url: 'https://flunearyou.org/map/markers',
        method: 'GET'
      }).success(function(data) {
        var map = new GMaps({
          zoom: 12
        });

        for (var i = 0; i <= data.length; i++) {
          map.addMarker({
            lat: data[i].latitude,
            lng: data[i].longitude,
            title: data[i].city,
            // icon: 'images/icon-map-brasil.png',
            infoWindow: {
              content: '<p>' + data[i].city + '</p>'
            }
          });
        }
      }).error(function(error) {
        console.warn('Request data error:', error);
      });
    }
  }

  return obj;
});
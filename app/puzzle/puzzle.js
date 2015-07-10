'use strict';

angular.module('myApp.puzzle', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/puzzle', {
    templateUrl: 'puzzle/puzzle.html',
    controller: 'PuzzleCtrl'
  });
}])

.controller('PuzzleCtrl', function($scope, ListPuzzles, $rootScope, $location) {
  $scope.title = 'Puzzle';
  $scope.puzzles = {};
  $rootScope.bodylayout = 'body-puzzle';

  $scope.questions = [];

  $scope.addQuestion = function(puzzleID) {
    $scope.questions.push(puzzleID);

    var mask;
    mask = document.querySelector('#mask');
  };

  $scope.removeMedal = function() {
    var medal, mask;
    
    medal = document.querySelector('#question-medal');
    mask = document.querySelector('#mask');

    medal.classList.remove('js-show');
    mask.classList.remove('js-show');

    $location.path('#/home/');
  };

  $scope.flipCard = function(questionID) {
    var questionID;

    questionID = document.querySelector('#flip-card-' + questionID);
    questionID.classList.toggle('active');
  };

  $scope.showQuestion = function(questionID) {
    var mask, questionID;
    
    mask = document.querySelector('#mask');
    questionID = document.querySelector('#question-' + questionID);
    
    mask.classList.add('js-show');
    questionID.classList.toggle('js-show');
  };

  $scope.removeClass = function(questionID) {
    var mask, questionID, medal;
    
    mask = document.querySelector('#mask');
    questionID = document.querySelector('#question-' + questionID);
    medal = document.querySelector('#question-medal');

    mask.classList.remove('js-show');
    questionID.classList.remove('js-show');

    if ($scope.questions.length == 2) {
      mask.classList.toggle('js-show');
      medal.classList.toggle('js-show');
    }
  };

  ListPuzzles.getPuzzles(function(data) {
    $scope.puzzles = data;
  });
})

.factory('ListPuzzles', function ($http) {
  var listaDePuzzles, obj;
  obj = {};

  obj = {
    getPuzzles: function(callback) {
      if (listaDePuzzles) {
        callback(listaDePuzzles);
        return false;
      } else {
        $http({
          method: 'GET',
          url: 'data/puzzles.json'
        }).success(function(data) {
          obj.savePuzzles(data);
          callback(data);
        });
      }
    },

    savePuzzles: function(data) {
      listaDePuzzles = data;
    },
  }

  return obj;
})

.directive('toggleClass', function () {
  return {
    restrict: 'A',
    link: function (scope, iElement, iAttrs) {
      iElement.bind('click', function() {
        iElement.toggleClass(iAttrs.toggleClass);
      });
    }
  };
});
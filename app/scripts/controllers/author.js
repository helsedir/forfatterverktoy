'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:AuthorCtrl
 * @description
 * # AuthorCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('AuthorCtrl',['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

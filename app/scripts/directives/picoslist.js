'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:picosList
 * @description
 * # picosList
 */
angular.module('webUiApp')
  .directive('picosList', function () {
    return {
      templateUrl: 'views/partials/_picoslist.html',
      restrict: 'E'
    };
  });

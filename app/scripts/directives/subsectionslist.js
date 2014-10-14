'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:subsectionsList
 * @description
 * # subsectionsList
 */
angular.module('webUiApp')
  .directive('subsectionsList', function () {
    return {
      templateUrl: 'views/partials/_subsectionslist.html',
      restrict: 'E'
    };
  });

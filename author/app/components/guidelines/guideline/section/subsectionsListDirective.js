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
      templateUrl: 'components/guidelines/guideline/section/_subsectionslist.html',
      restrict: 'E'
    };
  });

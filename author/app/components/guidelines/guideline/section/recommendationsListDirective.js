'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:recommendationsList
 * @description
 * # recommendationsList
 */
angular.module('webUiApp')
  .directive('recommendationsList', function () {
    return {
      templateUrl: 'components/guidelines/guideline/section/_recommendationslist.html',
      restrict: 'E',
    };
  });

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
      templateUrl: 'views/partials/_recommendationslist.html',
      restrict: 'E',
    };
  });

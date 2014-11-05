'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:authorlist
 * @description
 * # authorlist
 */
angular.module('webUiApp')
  .directive('authorsList', function () {
    return {
      templateUrl: 'components/guidelines/guideline/_authorslist.html',
      restrict: 'E'
    };
  });

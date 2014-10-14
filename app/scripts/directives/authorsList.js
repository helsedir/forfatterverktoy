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
      templateUrl: 'views/partials/_authorslist.html',
      restrict: 'E'
    };
  });

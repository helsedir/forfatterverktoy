'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:taxonomycodesList
 * @description
 * # taxonomycodesList
 */
angular.module('webUiApp')
  .directive('taxonomycodesList', function () {
    return {
      templateUrl: 'views/partials/_taxonomycodeslist.html',
      restrict: 'E'
    };
  });

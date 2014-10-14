'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:picocodesList
 * @description
 * # picocodesList
 */
angular.module('webUiApp')
  .directive('picocodesList', function () {
    return {
      templateUrl: 'views/partials/_picocodeslist.html',
      restrict: 'E'
    };
  });

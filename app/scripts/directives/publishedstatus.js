'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:publishedStatus
 * @description
 * # publishedStatus
 */
angular.module('webUiApp')
  .directive('publishedStatus', function () {
    return {
      templateUrl: 'views/partials/_publishedstage.html',
      restrict: 'E',
    };
  });

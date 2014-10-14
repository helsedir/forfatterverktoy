'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:emrinfoList
 * @description
 * # emrinfoList
 */
angular.module('webUiApp')
  .directive('emrinfoList', function () {
    return {
      templateUrl: 'views/partials/_emrinfolist.html',
      restrict: 'E'
    };
  });

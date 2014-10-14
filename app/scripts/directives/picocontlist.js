'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:picocontList
 * @description
 * # picocontList
 */
angular.module('webUiApp')
  .directive('picocontList', function () {
    return {
      templateUrl: 'views/partials/_picocontlist.html',
      restrict: 'E'
    };
  });

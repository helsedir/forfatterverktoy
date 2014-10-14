'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:keyinfoList
 * @description
 * # keyinfoList
 */
angular.module('webUiApp')
  .directive('keyinfoList', function () {
    return {
      templateUrl: 'views/partials/_keyinfolist.html',
      restrict: 'E'
    };
  });

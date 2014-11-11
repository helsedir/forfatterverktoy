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
      templateUrl: 'components/guidelines/guideline/section/recommendation/pico/picocode/_taxonomycodeslist.html',
      restrict: 'E'
    };
  });

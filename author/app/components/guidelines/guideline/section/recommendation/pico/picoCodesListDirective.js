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
      templateUrl: 'components/guidelines/guideline/section/recommendation/pico/_picocodeslist.html',
      restrict: 'E'
    };
  });

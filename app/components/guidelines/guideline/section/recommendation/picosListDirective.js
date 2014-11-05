'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:picosList
 * @description
 * # picosList
 */
angular.module('webUiApp')
  .directive('picosList', function () {
    return {
      templateUrl: 'components/guidelines/guideline/section/recommendation/_picoslist.html',
      restrict: 'E'
    };
  });

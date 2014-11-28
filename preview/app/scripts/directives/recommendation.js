'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:recommendation
 * @description
 * # recommendation
 */
angular.module('guidelinePreviewApp')
  .directive('recommendation', function () {
    return {
      templateUrl: 'views/partials/_recommendation.html',
      replace: true,
      restrict: 'E'
    };
  });

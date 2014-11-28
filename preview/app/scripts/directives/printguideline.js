'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:printGuideline
 * @description
 * # printGuideline
 */
angular.module('guidelinePreviewApp')
  .directive('printGuideline', function () {
    return {
      templateUrl: 'views/partials/print/_guideline.html',
      restrict: 'E',
      transclude: true
    };
  });

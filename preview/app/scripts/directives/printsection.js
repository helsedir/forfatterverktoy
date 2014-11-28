'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:printSection
 * @description
 * # printSection
 */
angular.module('guidelinePreviewApp')
  .directive('printSection', function () {
    return {
      templateUrl: 'views/partials/print/_section.html',
      restrict: 'E',
      transclude: true
    };
  });

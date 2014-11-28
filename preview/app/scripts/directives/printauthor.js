'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:printAuthor
 * @description
 * # printAuthor
 */
angular.module('guidelinePreviewApp')
  .directive('printAuthor', function () {
    return {
      templateUrl: 'views/partials/print/_author.html',
      restrict: 'E',
      transclude: true
    };
  });

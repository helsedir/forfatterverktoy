'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:aboutSection
 * @description
 * # aboutSection
 */
angular.module('guidelinePreviewApp')
  .directive('aboutSection', function () {
    return {
      templateUrl: 'views/partials/_aboutsection.html',
      restrict: 'E',
      replace: 'true'
    };
  });

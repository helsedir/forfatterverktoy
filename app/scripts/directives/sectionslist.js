'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:sectionList
 * @description
 * # sectionList
 */
angular.module('webUiApp')
  .directive('sectionsList', function () {
    return {
      templateUrl: 'views/partials/_sectionslist.html',
      restrict: 'E'
    };
  });

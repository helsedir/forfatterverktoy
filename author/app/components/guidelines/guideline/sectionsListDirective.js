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
      templateUrl: 'components/guidelines/guideline/_sectionslist.html',
      restrict: 'E'
    };
  });

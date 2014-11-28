'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:emrinfoList
 * @description
 * # emrinfoList
 */
angular.module('webUiApp')
  .directive('emrinfoList', function () {
    return {
      templateUrl: 'components/guidelines/guideline/section/recommendation/_emrinfolist.html',
      restrict: 'E'
    };
  });

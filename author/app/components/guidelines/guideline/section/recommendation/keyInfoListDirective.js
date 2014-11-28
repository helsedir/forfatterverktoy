'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:keyinfoList
 * @description
 * # keyinfoList
 */
angular.module('webUiApp')
  .directive('keyinfoList', function () {
    return {
      templateUrl: 'components/guidelines/guideline/section/recommendation/_keyinfolist.html',
      restrict: 'E'
    };
  });

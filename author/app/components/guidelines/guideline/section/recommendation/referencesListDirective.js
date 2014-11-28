'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:referencesList
 * @description
 * # referencesList
 */
angular.module('webUiApp')
  .directive('referencesList', function () {
    return {
      templateUrl: 'components/guidelines/guideline/section/recommendation/_referenceslist.html',
      restrict: 'E'
    };
  });

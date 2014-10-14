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
      templateUrl: 'views/partials/_referenceslist.html',
      restrict: 'E'
    };
  });

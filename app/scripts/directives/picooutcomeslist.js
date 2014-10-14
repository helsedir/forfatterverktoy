'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:picooutcomesList
 * @description
 * # picooutcomesList
 */
angular.module('webUiApp')
  .directive('picooutcomesList', function () {
    return {
      templateUrl: 'views/partials/_picooutcomeslist.html',
      restrict: 'E'
    };
  });

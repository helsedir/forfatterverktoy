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
      templateUrl: 'components/guidelines/guideline/section/recommendation/pico/_picooutcomeslist.html',
      restrict: 'E'
    };
  });

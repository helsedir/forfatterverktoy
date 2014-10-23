'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:metadata
 * @description
 * # metadata
 */
angular.module('webUiApp')
  .directive('metadata', function () {
    return {
    	restrict: 'E',
    	scope: {
    	    resource: '@'
    	},
    	template:  ''
    };
  });

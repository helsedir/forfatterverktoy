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
    	template:  '<p><b>Opprettet av:</b> {{resource.createdBy}}, <i>{{resource.createdDate | date}}</i> <b>Oppdatert av:</b> {{resource.updatedBy}}, <i>{{resource.updatedDate | date}}</i></p>'
    };
  });

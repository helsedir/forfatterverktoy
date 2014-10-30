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
    	template:  '<small><p><b>Opprettet av:</b> {{createdBy}},'+ 
    	'<i>{{createdDate | date}}</i>  <b>Oppdatert av:</b> {{updatedBy}}, <i>{{updatedDate | date}}</i></p></small>',
    	restrict: 'E',
    	scope: {
    	    'createdBy': '@',
    	    'createdDate': '@',
    	    'updatedBy': '@',
    	    'updatedDate': '@'
    	}
    };
  });

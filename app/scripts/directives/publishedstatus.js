'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:publishedStatus
 * @description
 * # publishedStatus
 */
angular.module('webUiApp')
  .directive('publishedStatus', function ($state) {
    return {
      templateUrl: 'views/partials/_publishedstage.html',
      restrict: 'E',
      
      /*jshint unused: false */
      link: function postLink(scope, element, attrs) {

        switch($state.current.name){
        	case 'guideline':
        		scope.resource = 'Retningslinjen';
        		break;
        	case 'section':
        		scope.resource = 'Seksjonen';
        		break;
        	case 'recommendation':
        		scope.resource = 'Anbefalingen';
        		break;
        }
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:previewButton
 * @description
 * # previewButton
 */
angular.module('webUiApp')
  .directive('previewButton', function ($state, $stateParams) {
    return {
      template: '<a class="pull-right" href="{{url}}" target="_new">Forhåndsvis {{text}}  <span class="glyphicon glyphicon-new-window"></span></btn>',
      restrict: 'E',
      /*jshint unused: false */
      link: function postLink(scope, element, attrs) {
      	var baseUrl = 'http://localhost:8000/#/';
      	switch($state.current.name){
      		case 'guideline':
      			scope.text = 'retningslinje';
      			scope.url = baseUrl + $stateParams.guidelineId;
      			break;
      		case 'section':
      			scope.text = 'seksjon';
      			scope.url = baseUrl + $stateParams.guidelineId + '/section/' + $stateParams.sectionId;
      			break;
      		case 'recommendation':
      			scope.text = 'anbefaling';
      			scope.url = baseUrl + $stateParams.guidelineId + '/section/' + $stateParams.sectionId + '/recommendation/' + $stateParams.recommendationId;
      			break;
			default:
				scope.text = 'retningslinjer';
				scope.url = baseUrl;
				break;
      	}
      }
    };
  });

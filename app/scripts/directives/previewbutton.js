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
      link: function postLink(scope, element, attrs) {
      	var baseUrl = 'http://digitalguidelinespreview.azurewebsites.net/#/'
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
      	}
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:onHearing
 * @description
 * # onHearing
 */
angular.module('webUiApp')
  .directive('onHearing', function ($state, $stateParams) {
    return {
      template: '<div class="row" ng-if="publishedStage == 1">'+
				'<div class="col-md-12"><div class="alert alert-info">'+
        'Høringsadresse: <a href="{{url}}">{{url}}</a>'+
        '</div></div>'+
				'</div>',
      restrict: 'EA',
      scope: {
        'publishedStage': '=publishedstage'
      },
      /*jshint unused: false */
      link: function(scope, element, attrs){
        var baseUrl = 'http://localhost:8000/#/';
        switch($state.current.name){
          case 'guideline':
            scope.url = baseUrl + $stateParams.guidelineId + '?preview=true';
            break;
          case 'section':
            scope.url = baseUrl + $stateParams.guidelineId + '/section/' + $stateParams.sectionId + '?preview=true';
            break;
          case 'recommendation':
            scope.url = baseUrl + $stateParams.guidelineId + '/section/' + $stateParams.sectionId + '/recommendation/' + $stateParams.recommendationId + '?preview=true';
            break;
        }
      }
    };
  });

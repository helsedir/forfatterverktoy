'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:publishedStage
 * @description
 * # publishedStage
 */
angular.module('guidelinePreviewApp')
  .directive('publishedStage', function () {
    return {
      template: '<alert type="info" ng-if="publishedStageText.length > 1" ng-show="showAlert" class="publishedstage" close="closeAlert()"><p><span class="glyphicon glyphicon-info-sign"></span> {{resource}} er {{publishedStageText}}</p></alert>',
      restrict: 'E',
      scope: { 'publishedStage': '=publishedstage', 'resource': '@' },
      /*jshint unused: false */
      link: function postLink(scope, element, attrs) {
        scope.showAlert = true;
        scope.closeAlert = function(){
          scope.showAlert = false;
        };

      	scope.$watch('publishedStage', function() { 
      		switch(scope.publishedStage){
      			case 0:
      				scope.publishedStageText = "lagret som kladd";

      				break;
      			case 1:
      				scope.publishedStageText = "sent på høring";

      				break;
      			case 2:
      				scope.publishedStageText = "publisert";

      				break;
      		}

      	 });
      }
    };
  });

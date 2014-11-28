'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:printRecommendation
 * @description
 * # printRecommendation
 */
angular.module('guidelinePreviewApp')
  .directive('recommendationStrength', function () {
    return {
      template: '<small ng-if="strengthText.length > 0">Styrke på anbefalingen: {{strengthText}}</small>',
      restrict: 'EA',
      scope: {
        'strength': '='
      },
      link: function (scope){

        scope.$watch('strength', function (){
          switch (scope.strength) {
            case 'weak':
                  scope.strengthText = 'svak';
                  break;
            case 'strong':
                  scope.strengthText = 'sterk';
                  break;
            case 'null':
                  scope.strengthText = '';
                  break;
            default:
                  scope.strengthText = '';
          }
        });
      }
    };
  });

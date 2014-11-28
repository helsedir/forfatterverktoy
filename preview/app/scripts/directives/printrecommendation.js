'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:printRecommendation
 * @description
 * # printRecommendation
 */
angular.module('guidelinePreviewApp')
  .directive('printRecommendation', function (Recommendation, ErrorService) {
    return {
      templateUrl: 'views/partials/print/_recommendation.html',
      restrict: 'E',
      scope: {
      	'recommendationId' : '=recommendationid'
      },
      transclude: true,
      link: function (scope, element, attrs){
      	Recommendation.get({_id: scope.recommendationId}).$promise.then(function(recommendation){
      	  		//success
      			scope.recommendation = recommendation;
      	           
      	  	}, function(error){
      	  		ErrorService.handleError(error);
      	});
      }
    };
  });

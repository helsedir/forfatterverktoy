'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:RecommendationCtrl
 * @description
 * # RecommendationCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('RecommendationCtrl',['$scope', 'Recommendation', '$routeParams', '$location', '$timeout', function ($scope, Recommendation, $routeParams, $location, $timeout) {
  	
  	var recommendationId = $routeParams.recommendationId;
  	
  	Recommendation.get({_id: recommendationId}, function(data){
  		$scope.recommendation = data;
  	});

    $scope.updateRecommendation = function() {
    	Recommendation.update({ _id: $scope.recommendation.recommendationId }, $scope.recommendation);
      	$timeout(function() {
        	$location.path('/');
      	}, 200);
    };

    $scope.removeRecommendation = function(index) {
    	
    };

  }]);

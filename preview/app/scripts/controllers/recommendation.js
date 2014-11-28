'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RecommendationCtrl
 * @description
 * # RecommendationCtrl
 * Controller of the angularApp
 */
angular.module('guidelinePreviewApp')
  .controller('RecommendationCtrl', ['$scope', 'Recommendation', 'Guideline', 'toastr', '$routeParams', '$location', 'ErrorService', '$rootScope', function ($scope, Recommendation, Guideline, toastr, $routeParams, $location, ErrorService, $rootScope) {
    $rootScope.recommendation = true;
    var recommendationId = $routeParams.recommendationId;
    var guidelineId = $routeParams.guidelineId;
    var preview = false;
    preview = ($location.search()).preview;
    Recommendation.get({_id: recommendationId, preview: preview}).$promise.then(function(recommendation){
      		//success
    		$scope.recommendation = recommendation;
      	}, function(error){
      		ErrorService.handleError(error);
      	});
    Guideline.get({_id: guidelineId}).$promise.then(function(guideline){
      //success
      $scope.guideline = guideline;
    }, function(error){
      ErrorService.handleError(error);
    });
  }]);

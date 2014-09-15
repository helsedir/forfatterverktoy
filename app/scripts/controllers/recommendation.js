'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:RecommendationCtrl
 * @description
 * # RecommendationCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('RecommendationCtrl',['$scope', 'Recommendation', '$routeParams', '$location', 'Section', 'toastr', function ($scope, Recommendation, $routeParams, $location, Section, toastr) {
  	
  	var recommendationId = $routeParams.recommendationId;
    var sectionId = $routeParams.sectionId;
  	
    if(recommendationId != 0)
    {
      Recommendation.get({_id: recommendationId}, function(data){
        $scope.recommendation = data;
      });
    }
  	
    $scope.updateRecommendation = function() {
      if(typeof sectionId !== 'undefined')
      {
        Section.addRecommendation({id: sectionId}, $scope.recommendation)
        .$promise.then(function(data){
          toastr.success($scope.recommendation.heading, 'Lagret');
          $location.path('/section/'+ sectionId);
        },function(error){
          handlePostError(error);
        });
      }
      else{
      Recommendation.update({ _id: $scope.recommendation.recommendationId }, $scope.recommendation)
      .$promise.then(function(data){
          toastr.success($scope.recommendation.heading, 'Lagret');
        }, function(error){
          handlePostError(error);
        });
    }
    };

    $scope.removeRecommendation = function(index) {
    	
    };

    //Handles errors when post fails
    function handlePostError(error)
    {
      if(error.status == 401)
      {
        toastr.warning('Logg inn for å lagre');
      }
      else
      {
        toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
      }
    };
  }]);

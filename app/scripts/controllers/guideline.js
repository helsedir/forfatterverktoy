'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:GuidelineCtrl
 * @description
 * # GuidelineCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('GuidelineCtrl',['$scope', 'Guideline', '$routeParams', '$location', '$timeout', 'toastr', function ($scope, Guideline, $routeParams, $location, $timeout, toastr) {

  	var guidelineId = $routeParams.guidelineId;

  	Guideline.get({_id: guidelineId}, function(data){
  		$scope.guideline = data;
  	});
    
    $scope.updateGuideline = function() {
    	Guideline.update({ _id: $scope.guideline.guidelineId }, $scope.guideline)
      .$promise.then(function(data){

        toastr.success($scope.guideline.title, 'Lagret');
      }, function(error){

        toastr.error('Status code: ' + error.status + ' Error data: ' + error.data, 'Error!');
      });

      /*$timeout(function() {
        $location.path('/');
      }, 200);*/
    };

    $scope.removeGuideline = function(index) {
    	$scope.guidelines.splice(index, 1)
    };

    $scope.addAuthor = function(guidelineId) {
      $location.path('/addAuthor');
    };

  }]);

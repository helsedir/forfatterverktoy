'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('GuidelinesCtrl',['$scope', '$resource', 'Guideline','toastr', '$location', 'Crud', function ($scope, $resource, Guideline, toastr, $location, Crud) {


  	Guideline.query().$promise.then(function(guidelines){
  		//success
		$scope.guidelines = guidelines;
  	}, function(error){
  		toastr.error(error.data.message, 'Error!');
  	});

  	$scope.addGuidelineBtnClick = function(){
		  $location.path('/guideline/0');
  	}; 

    $scope.editGuidelineBtnClick = function(index){
      $location.path('/guideline/' + index);
    };

    $scope.deleteGuidelineBtnClick = function(index){
      var guidelineToDelete = $scope.guidelines[index];
      Guideline.delete({ _id: guidelineToDelete.guidelineId })
      .$promise.then(function(){
        toastr.success(guidelineToDelete.title, 'Slettet');
        $scope.guidelines.splice(index, 1);
      }, function(error){
          Crud.handlePostError(error);
      });
    };

  }]);

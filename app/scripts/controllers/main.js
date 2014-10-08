'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('MainCtrl',['$scope', '$resource', 'Guideline','toastr', '$location', function ($scope, $resource, Guideline, toastr, $location) {


  	Guideline.query().$promise.then(function(guidelines){
  		//success
		$scope.guidelines = guidelines;
  	}, function(error){
  		console.log(error);
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
        if(error.status == 401)
        {
          toastr.warning('Logg inn for å slette');
        }
        else
        {
          toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
        }
      });
    };

    $scope.textAngularOpts = {};

  }]).directive('ngConfirmClick', [
  function(){
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    };
  }
]);

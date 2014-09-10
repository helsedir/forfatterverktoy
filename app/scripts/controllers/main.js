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
  		toastr.error(error.data.message, 'Error!')
  	});

  	$scope.addGuideline = function(){
		$location.path('/guideline/0');
  	}; 
  }]);

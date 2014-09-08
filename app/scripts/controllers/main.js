'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('MainCtrl',['$scope', '$resource', 'Guideline','toastr', function ($scope, $resource, Guideline, toastr) {


  	Guideline.query().$promise.then(function(guidelines){
  		//success
		$scope.guidelines = guidelines;
  	}, function(error){
  		console.log(error);
  		toastr.error(error.data.message, 'Error!')
  	}); 
  }]);

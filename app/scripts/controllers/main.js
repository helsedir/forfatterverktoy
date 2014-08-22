'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('MainCtrl',['$scope', '$resource', 'Guideline', function ($scope, $resource, Guideline) {

  	Guideline.query().$promise.then(function(guidelines){
  		//success
  		$scope.guidelines = guidelines;
  	}, function(errResponse){
  		console.log(errResponse);
  	});

  }]);

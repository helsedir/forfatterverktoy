'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:TaxonomycodeCtrl
 * @description
 * # TaxonomycodeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('TaxonomycodeCtrl', ['$scope', 'TaxonomyCode', '$routeParams', '$location', '$timeout', function ($scope, TaxonomyCode, $routeParams, $location, $timeout) {
  	
  	var taxonomyCodeId = $routeParams.taxonomyCodeId;
  	
  	TaxonomyCode.get({_id: taxonomyCodeId}, function(data){
  		$scope.taxonomyCode = data;
  	});

    $scope.updateTaxonomyCode = function() {
    	TaxonomyCode.update({ _id: $scope.taxonomyCode.taxonomyCodeId }, $scope.taxonomyCode);
      	$timeout(function() {
        	$location.path('/');
      	}, 200);
    };

    $scope.removeTaxonomyCode = function(index) {
    	
    };

  }]);
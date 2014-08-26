'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicocodeCtrl
 * @description
 * # PicocodeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('PicocodeCtrl', ['$scope', 'PicoCode', '$routeParams', '$location', '$timeout', function ($scope, PicoCode, $routeParams, $location, $timeout) {
  	
  	var picoCodeId = $routeParams.picoCodeId;
  	
  	PicoCode.get({_id: picoCodeId}, function(data){
  		$scope.picoCode = data;
  	});

    $scope.updatePicoCode = function() {
    	PicoCode.update({ _id: $scope.picoCode.picoCodeId }, $scope.picoCode);
      	$timeout(function() {
        	$location.path('/');
      	}, 200);
    };

    $scope.removePicoCode = function(index) {
    	
    };

  }]);

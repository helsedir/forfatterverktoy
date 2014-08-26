'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicoCtrl
 * @description
 * # PicoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('PicoCtrl', ['$scope', 'Pico', '$routeParams', '$location', '$timeout', function ($scope, Pico, $routeParams, $location, $timeout) {
  	
  	var picoId = $routeParams.picoId;
  	
  	Pico.get({_id: picoId}, function(data){
  		$scope.pico = data;
  	});

    $scope.updatePico = function() {
    	Pico.update({ _id: $scope.pico.picoId }, $scope.pico);
      	$timeout(function() {
        	$location.path('/');
      	}, 200);
    };

    $scope.removePico = function(index) {
    	
    };

  }]);

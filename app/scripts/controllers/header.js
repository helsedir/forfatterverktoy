'use strict';

angular.module('webUiApp')
	.controller('headerCtrl', ['$scope', '$location', function ($scope, $location){
		$scope.isActive = function (viewLocation) { 
		       return viewLocation == $location.path();
		   };
	}]);
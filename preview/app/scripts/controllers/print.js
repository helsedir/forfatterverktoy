'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:PrintctrlCtrl
 * @description
 * # PrintctrlCtrl
 * Controller of the angularApp
 */
angular.module('guidelinePreviewApp')
  .controller('PrintCtrl', function (Guideline, Section, Recommendation, $routeParams, ErrorService, $location, $scope, $rootScope) {
  	$rootScope.recommendation = true;
  	var guidelineId = $routeParams.guidelineId;
    var preview = false;
    preview = ($location.search()).preview;

	Guideline.get({_id: guidelineId, preview: preview}).$promise.then(function(guideline){
	  		//success
			$scope.guideline = guideline;
            
	  	}, function(error){
	  		ErrorService.handleError(error);
	});
    

  });

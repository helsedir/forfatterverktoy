'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:GuidelineCtrl
 * @description
 * # GuidelineCtrl
 * Controller of the angularApp
 */
angular.module('guidelinePreviewApp')
  .controller('GuidelineCtrl',['Guideline', 'toastr', '$scope', '$routeParams', '$location', 'ErrorService', function (Guideline, toastr, $scope, $routeParams, $location, ErrorService) {
    var guidelineId = $routeParams.guidelineId;
    var preview = false;
    preview = ($location.search()).preview;

    Guideline.get({_id: guidelineId, preview: preview}).$promise.then(function(guideline){
      		//success
    		$scope.retningslinje = guideline;
      	}, function(error){
      		ErrorService.handleError(error);
      	});
  }]);

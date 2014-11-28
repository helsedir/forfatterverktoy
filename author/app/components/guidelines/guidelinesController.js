'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('GuidelinesCtrl',['$scope', '$resource', 'Guideline', '$location', function ($scope, $resource, Guideline, $location) {

    //Get all the guidelines
  	Guideline.getGuidelines().then(function () {
      $scope.guidelines = Guideline.guidelines;
    });

  	$scope.addGuidelineBtnClick = function(){
      $location.path('/guideline/0');
  	}; 

    $scope.editGuidelineBtnClick = function(index){
      $location.path('/guideline/' + index);
    };

    $scope.deleteGuidelineBtnClick = function(guideline) {
      Guideline.deleteGuideline(guideline);
    };

  }]);

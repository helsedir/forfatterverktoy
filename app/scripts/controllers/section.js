'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:SectionCtrl
 * @description
 * # SectionCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('SectionCtrl', ['$scope', 'Section', '$routeParams', '$location', '$timeout', function ($scope, Section, $routeParams, $location, $timeout) {

  	var sectionId = $routeParams.sectionId;

  	Section.get({_id: sectionId}, function(data){
  		$scope.section = data;
  	});
    
    $scope.updateSection = function() {
    	Section.update({ _id: $scope.section.sectionId }, $scope.section);
      	$timeout(function() {
        	$location.path('/');
      	}, 200);
    };

    $scope.removeSection = function(index) {
    	
    };

  }]);

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainctrlCtrl
 * @description
 * # MainctrlCtrl
 * Controller of the angularApp
 */
angular.module('guidelinePreviewApp')
  .controller('MainCtrl', ['$scope', 'Guideline', 'toastr', 'ErrorService', function ($scope, Guideline, toastr, ErrorService) {
    $scope.refineSearch = 0;
    Guideline.query().$promise.then(function(guidelines){
      		//success
    		$scope.guidelines = guidelines;
      	}, function(error){
      		ErrorService.handleError(error);
      	});
  }])
  .filter('isType', function () {
    return function (items, type) {
      //Check that the async items are received before filtering
      if (typeof(items) != 'undefined') {
        //If we want all items
        if(type == 0) {
          return items;
        }
        else {
          var filtered = [];
          for (var i = 0; i < items.length; i++) {
            if (items[i].type == type) {
              filtered.push(items[i]);
            }
          }
          return filtered;
        }
      }
    };
  });

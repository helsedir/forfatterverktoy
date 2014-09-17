'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:TaxonomycodeCtrl
 * @description
 * # TaxonomycodeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('TaxonomycodeCtrl', ['$scope', 'TaxonomyCode', '$routeParams', 'PicoCode','$location', '$timeout', 'toastr', function ($scope, TaxonomyCode, $routeParams, PicoCode, $location, $timeout, toastr) {
  	
  	var taxonomyCodeId = $routeParams.taxonomyCodeId;
    var picoCodeId = $routeParams.picoCodeId;
  	
    if(taxonomyCodeId != 0){
      TaxonomyCode.get({_id: taxonomyCodeId}, function(data){
        $scope.taxonomyCode = data;
      });
    }


    $scope.updateOrCreateTaxonomyCode = function() {
      if(taxonomyCodeId != 0){
      TaxonomyCode.update({ _id: taxonomyCodeId }, $scope.taxonomyCode)
      .$promise.then(function(data){
          toastr.success(data.name, 'Lagret');
          $location.path('/taxonomyCode/'+ data.taxonomyCodeId);
        }, function(error){
          handlePostError(error);
        });
      }

      else if(typeof(picoCodeId) != 'undefined' && picoCodeId != null)
      {
        PicoCode.addTaxonomyCode({id: picoCodeId}, $scope.taxonomyCode)
        .$promise.then(function(data){
          toastr.success(data.name, 'Opprettet TaxonomyCode');
          $location.path('/taxonomyCode/'+ data.taxonomyCodeId);
        },function(error){
          handlePostError(error);
        });
      }
    };

    $scope.removeTaxonomyCode = function(index) {
    	
    };

  }]);
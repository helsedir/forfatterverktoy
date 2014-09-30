'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicocodeCtrl
 * @description
 * # PicocodeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('PicocodeCtrl', ['$scope', 'PicoCode', '$stateParams', 'Pico', '$location', '$timeout', 'toastr', function ($scope, PicoCode, $stateParams, Pico, $location, $timeout, toastr) {
  	
  	var picoCodeId = $stateParams.picoCodeId;
    var picoId = $stateParams.picoId;
  	
    if(picoCodeId != 0){
      PicoCode.get({_id: picoCodeId}, function(data){
        $scope.picoCode = data;
      });      
    }

    $scope.updateOrCreatePicoCode = function() {
    	if(picoCodeId != 0){
      PicoCode.update({ _id: picoCodeId }, $scope.picoCode)
      .$promise.then(function(data){
          toastr.success(data.ontologyName, 'Lagret');
          $location.path('/picoCode/'+ data.picoCodeId);
        }, function(error){
          handlePostError(error);
        });
      }

      else if(typeof(picoId) != 'undefined' && picoId != null)
      {
        Pico.addPicoCode({id: picoId}, $scope.picoCode)
        .$promise.then(function(data){
          toastr.success(data.ontologyCode, 'Opprettet PicoCode');
          $location.path('/picoCode/'+ data.picoCodeId);
        },function(error){
          handlePostError(error);
        });
      }
    };

    $scope.removePicoCode = function(index) {
    	
    };
    $scope.addTaxonomyCodeBtnClick = function()
    {
      $location.path('/taxonomyCode/0').search('picoCodeId', picoCodeId).search('schemaSystem', $scope.picoCode.ontologyName).search('schemaId', $scope.picoCode.ontologyName);
    }
  }]);

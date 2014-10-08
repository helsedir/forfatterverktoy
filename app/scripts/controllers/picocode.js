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
  	var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
  	var picoCodeId = $stateParams.picoCodeId;
    var picoId = $stateParams.picoId;

    var baseUrl = '/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/'+picoId+'/picoCode/';
  	$scope.baseUrl = baseUrl;

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
          $location.path(baseUrl + data.picoCodeId);
        }, function(error){
          handlePostError(error);
        });
      }

      else if(typeof(picoId) != 'undefined' && picoId != null)
      {
        Pico.addPicoCode({id: picoId}, $scope.picoCode)
        .$promise.then(function(data){
          toastr.success(data.ontologyCode, 'Opprettet PicoCode');
          $location.path(baseUrl + data.picoCodeId);
        },function(error){
          handlePostError(error);
        });
      }
    };

    $scope.removePicoCode = function() {
    	
    };
    $scope.addTaxonomyCodeBtnClick = function()
    {
      $location.path(baseUrl + picoCodeId + '/taxonomyCode/0').search('schemaSystem', $scope.picoCode.ontologyName).search('schemaId', $scope.picoCode.ontologyName);
    };

    //Handles errors when post fails
    function handlePostError(error)
    {
      if(error.status == 401)
      {
        toastr.warning('Logg inn for å lagre');
      }
      else
      {
        toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
      }
    }
  }]);

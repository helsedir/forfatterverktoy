'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicocodeCtrl
 * @description
 * # PicocodeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('PicocodeCtrl', ['$scope', 'PicoCode', 'TaxonomyCode', '$stateParams', 'Pico', '$location', '$timeout', 'toastr', 'Crud', function ($scope, PicoCode, TaxonomyCode, $stateParams, Pico, $location, $timeout, toastr, Crud) {
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
          Crud.handlePostError(error);
        });
      }

      else if(typeof(picoId) != 'undefined' && picoId != null)
      {
        Pico.addPicoCode({id: picoId}, $scope.picoCode)
        .$promise.then(function(data){
          toastr.success(data.ontologyCode, 'Opprettet PicoCode');
          $location.path(baseUrl + data.picoCodeId);
        },function(error){
          Crud.handlePostError(error);
        });
      }
    };

    $scope.deletePicoCodeBtnClick = function() {
    	var picoCodeToDelete = $scope.picoCode;
      PicoCode.delete({ _id: picoCodeToDelete.picoCodeId })
          .$promise.then(function(){
          toastr.success('picoCode: ' + picoCodeToDelete.picoCodeId, 'Slettet');
          $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/'+picoId);
        }, function(error){
          Crud.handlePostError(error);
        });
    };

    $scope.addTaxonomyCodeBtnClick = function()
    {
      $location.path(baseUrl + picoCodeId + '/taxonomyCode/0').search('schemaSystem', $scope.picoCode.ontologyName).search('schemaId', $scope.picoCode.ontologyName);
    };

    $scope.deleteTaxonomyCodeBtnClick = function(index) {
      var taxonomyCodeToDelete = $scope.picoCode.taxonomyCodes[index];
      TaxonomyCode.delete({ _id: taxonomyCodeToDelete.taxonomyCodeId })
          .$promise.then(function(){
          toastr.success('taxonomyCode: ' + taxonomyCodeToDelete.taxonomyCodeId, 'Slettet');
          $scope.picoCode.taxonomyCodes.splice(index, 1);
        }, function(error){
          Crud.handlePostError(error);
        });
    };

  }]);

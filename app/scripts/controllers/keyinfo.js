'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:KeyInfoCtrl
 * @description
 * # KeyInfoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('KeyInfoCtrl', ['$scope', 'KeyInfo', '$stateParams', 'Recommendation', '$location', '$timeout', 'toastr', function ($scope, KeyInfo, $stateParams, Recommendation, $location, $timeout, toastr) {
  	var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
  	var keyInfoId = $stateParams.keyInfoId;
  	
    if(keyInfoId != 0){
      KeyInfo.get({_id: keyInfoId}, function(data){
      $scope.keyInfo = data;
      });
    }

    $scope.updateOrCreateKeyInfo = function() {
      if(keyInfoId != 0){
        KeyInfo.update({ _id: keyInfoId }, $scope.keyInfo)
        .$promise.then(function(data){
            toastr.success(data.summary, 'Lagret');
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/keyinfo/'+ data.keyInfoId);
          }, function(error){
            handlePostError(error);
          });
      }

      else if(typeof(recommendationId) != 'undefined' && recommendationId != null)
      {
        Recommendation.addKeyInfo({id: recommendationId}, $scope.keyInfo)
        .$promise.then(function(data){
          toastr.success(data.summary, 'Opprettet KeyInfo');
          $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/keyinfo/'+ data.keyInfoId);
        },function(error){
          handlePostError(error);
        });
      }
    };

    
    $scope.removeKeyInfo = function() {
    	
    };
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

'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:KeyInfoCtrl
 * @description
 * # KeyInfoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('KeyInfoCtrl', ['$scope', 'KeyInfo', '$stateParams', 'Recommendation', '$location', '$timeout', 'toastr', 'Crud', function ($scope, KeyInfo, $stateParams, Recommendation, $location, $timeout, toastr, Crud) {
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
            Crud.handlePostError(error);
          });
      }

      else if(typeof(recommendationId) != 'undefined' && recommendationId != null)
      {
        Recommendation.addKeyInfo({id: recommendationId}, $scope.keyInfo)
        .$promise.then(function(data){
          toastr.success(data.summary, 'Opprettet KeyInfo');
          $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/keyinfo/'+ data.keyInfoId);
        },function(error){
          Crud.handlePostError(error);
        });
      }
    };

    
    $scope.deleteKeyInfoBtnClick = function () {
        Crud.delete($scope.keyInfo, '/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId, 'KeyInfo', 'item.keyInfoId');
    };
    
    }]);

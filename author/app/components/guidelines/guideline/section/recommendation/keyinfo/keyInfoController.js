'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:KeyInfoCtrl
 * @description
 * # KeyInfoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('KeyInfoCtrl', ['$scope', 'KeyInfo', '$stateParams', 'Recommendation', '$location', function ($scope, KeyInfo, $stateParams, Recommendation, $location) {
  	var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
  	var keyInfoId = $stateParams.keyInfoId;
  	
    if(keyInfoId != 0){
      KeyInfo.getKeyInfo(keyInfoId).then(function () {
        $scope.keyInfo = KeyInfo.keyInfo;
      });
    }

    $scope.updateOrCreateKeyInfo = function() {
      if(keyInfoId != 0){
        KeyInfo.updateKeyInfo($scope.keyInfo);
      }

      else if(typeof(recommendationId) != 'undefined' && recommendationId != null)
      {
        Recommendation.addKeyInfo(recommendationId, $scope.keyInfo).then(function (data) {
          $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/keyinfo/'+ data.keyInfoId);
        });
      }
    };

    
    $scope.deleteKeyInfoBtnClick = function () {
      KeyInfo.deleteKeyInfo($scope.keyInfo.keyInfoId).then(function (){
        $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId);
      });
    };
    
    }]);

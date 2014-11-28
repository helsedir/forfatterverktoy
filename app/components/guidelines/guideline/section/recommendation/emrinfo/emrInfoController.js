'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:EmrInfoCtrl
 * @description
 * # EmrInfoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('EmrInfoCtrl', ['$scope', 'EmrInfo', '$stateParams', 'Recommendation', '$location', '$timeout', 'toastr', 'Crud', function ($scope, EmrInfo, $stateParams, Recommendation, $location, $timeout, toastr, Crud) {
  	var guidelineId = $stateParams.guidelineId;
    var sectionId = $stateParams.sectionId;
    var recommendationId = $stateParams.recommendationId;
  	var emrInfoId = $stateParams.emrInfoId;

    if(emrInfoId != 0){
      EmrInfo.getEmrInfo(emrInfoId).then(function () {
        $scope.emrInfo = EmrInfo.emrInfo;
      });
    }

    $scope.updateOrCreateEmrInfo = function() {
      if(emrInfoId != 0){
        EmrInfo.updateEmrInfo($scope.emrInfo);
      }

      else if(typeof(recommendationId) != 'undefined' && recommendationId != null)
      {
        Recommendation.addEmrInfo(recommendationId, $scope.emrInfo).then(function (data) {
          $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/emrinfo/'+ data.emrInfoId);
        });
      }
    };

    $scope.deleteEmrInfoBtnClick = function () {
      EmrInfo.deleteEmrInfo($scope.emrInfo).then(function () {
        $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId);
      });
    };
    }]);

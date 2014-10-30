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
      EmrInfo.get({_id: emrInfoId}, function(data){
      $scope.emrInfo = data;
      });
    }

    $scope.updateOrCreateEmrInfo = function() {
      if(emrInfoId != 0){
        EmrInfo.update({ _id: emrInfoId }, $scope.emrInfo)
        .$promise.then(function(data){
            toastr.success(data.summary, 'Lagret');
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/emrinfo/'+ data.emrInfoId);
          }, function(error){
            Crud.handlePostError(error);
          });
      }

      else if(typeof(recommendationId) != 'undefined' && recommendationId != null)
      {
        Recommendation.addEmrInfo({id: recommendationId}, $scope.emrInfo)
        .$promise.then(function(data){
          toastr.success(data.summary, 'Opprettet EmrInfo');
          $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/emrinfo/'+ data.emrInfoId);
        },function(error){
          Crud.handlePostError(error);
        });
      }
    };

    $scope.deleteEmrInfoBtnClick = function () {
        Crud.delete($scope.emrInfo, '/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId, 'EmrInfo', 'item.emrInfoId');
    };
    }]);

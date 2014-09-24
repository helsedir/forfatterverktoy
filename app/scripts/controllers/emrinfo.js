'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:EmrInfoCtrl
 * @description
 * # EmrInfoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('EmrInfoCtrl', ['$scope', 'EmrInfo', '$routeParams', 'Recommendation', '$location', '$timeout', 'toastr', function ($scope, EmrInfo, $routeParams, Recommendation, $location, $timeout, toastr) {
  	
  	var emrInfoId = $routeParams.emrInfoId;
    var recommendationId = $routeParams.recommendationId;
  	
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
            $location.path('/EmrInfo/'+ data.emrInfoId);
          }, function(error){
            handlePostError(error);
          });
      }

      else if(typeof(recommendationId) != 'undefined' && recommendationId != null)
      {
        Recommendation.addEmrInfo({id: recommendationId}, $scope.emrInfo)
        .$promise.then(function(data){
          toastr.success(data.summary, 'Opprettet EmrInfo');
          $location.path('/EmrInfo/'+ data.emrInfoId);
        },function(error){
          handlePostError(error);
        });
      }
    };

    
    $scope.removeEmrInfo = function(index) {
    	
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
    };
    
  }]);

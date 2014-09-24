'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:KeyInfoCtrl
 * @description
 * # KeyInfoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('KeyInfoCtrl', ['$scope', 'KeyInfo', '$routeParams', 'Recommendation', '$location', '$timeout', 'toastr', function ($scope, KeyInfo, $routeParams, Recommendation, $location, $timeout, toastr) {
  	
  	var keyInfoId = $routeParams.keyInfoId;
    var recommendationId = $routeParams.recommendationId;
  	
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
            $location.path('/keyinfo/'+ data.keyInfoId);
          }, function(error){
            handlePostError(error);
          });
      }

      else if(typeof(recommendationId) != 'undefined' && recommendationId != null)
      {
        Recommendation.addKeyInfo({id: recommendationId}, $scope.keyInfo)
        .$promise.then(function(data){
          toastr.success(data.summary, 'Opprettet KeyInfo');
          $location.path('/keyinfo/'+ data.keyInfoId);
        },function(error){
          handlePostError(error);
        });
      }
    };

    
    $scope.removeKeyInfo = function(index) {
    	
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

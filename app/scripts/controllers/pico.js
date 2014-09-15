'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicoCtrl
 * @description
 * # PicoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('PicoCtrl', ['$scope', 'Pico', '$routeParams', 'Recommendation', '$location', '$timeout', 'toastr', function ($scope, Pico, $routeParams, Recommendation, $location, $timeout, toastr) {
  	
  	var picoId = $routeParams.picoId;
    var recommendationId = $routeParams.recommendationId;
  	
    if(picoId != 0){
      Pico.get({_id: picoId}, function(data){
      $scope.pico = data;
      });
    }

    $scope.updateOrCreatePico = function() {
      if(picoId != 0){
      Pico.update({ _id: picoId }, $scope.pico)
      .$promise.then(function(data){
          toastr.success(data.summary, 'Lagret');
          $location.path('/pico/'+ data.picoId);
        }, function(error){
          handlePostError(error);
        });
      }

      else if(typeof(recommendationId) != 'undefined' && recommendationId != null)
      {
        Recommendation.addPico({id: recommendationId}, $scope.pico)
        .$promise.then(function(data){
          toastr.success(data.summary, 'Opprettet Pico');
          $location.path('/pico/'+ data.picoId);
        },function(error){
          handlePostError(error);
        });
      }
    };

    $scope.addPicoCodeBtnClick = function(){
      $location.path('/picoCode/0').search('picoId', picoId);
    }

    $scope.removePico = function(index) {
    	
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

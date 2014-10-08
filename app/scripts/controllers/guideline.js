'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:GuidelineCtrl
 * @description
 * # GuidelineCtrl
 * Controller of the webUiApp  
 */
angular.module('webUiApp')
  .controller('GuidelineCtrl',['$scope', 'Guideline', '$stateParams', '$location', 'toastr', function ($scope, Guideline, $stateParams, $location, toastr) {
  	var guidelineId = $stateParams.guidelineId;
    if(guidelineId == 0)
    {
      $scope.guideline = new Guideline();
    }
    else
    {      
      Guideline.get({_id: guidelineId}, function(data){
        $scope.guideline = data;
      });
    }

    
    $scope.updateOrCreateGuideline = function() {
      if($scope.guideline.guidelineId === null)
      {
        $scope.guideline.$save().then(function(data){
            toastr.success(data.title, 'Opprettet Retninglinje');
            $location.path('/guideline/'+ data.guidelineId);

        }, function (error){
          if(error.status == 401)
          {
            toastr.warning('Logg inn for å lagre');
          }
          else
          {
            toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
          }
        });
      }
      else
      {
        Guideline.update({ _id: $scope.guideline.guidelineId }, $scope.guideline)
        .$promise.then(function(){

          toastr.success($scope.guideline.title, 'Lagret');
        }, function(error){
          if(error.status == 401)
          {
            toastr.warning('Logg inn for å lagre');
          }
          else
          {
            toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
          }
        });
      }
    };

    $scope.removeGuidelineBtnClick = function() {
      $scope.guideline.isDeleted = true;
    	Guideline.update({ _id: $scope.guideline.guidelineId }, $scope.guideline)
      .$promise.then(function(){

        toastr.success($scope.guideline.title, 'Slettet');
        $location.path('/');
      }, function(error){
            if(error.status == 401)
            {
              toastr.warning('Logg inn for å slette');
            }
            else
            {
              toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
            }
        });
    };

    $scope.addAuthorBtnClick = function() {
      $location.path('/guideline/'+guidelineId+'/author/0');
    };

    $scope.removeAuthorBtnClick = function(index){
      Guideline.deleteAuthor({_id: index});
    };

    $scope.addSectionBtnClick = function(){
      $location.path('/guideline/'+guidelineId+'/section/0');
    };


  }]);

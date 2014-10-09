'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:GuidelineCtrl
 * @description
 * # GuidelineCtrl
 * Controller of the webUiApp  
 */
angular.module('webUiApp')
  .controller('GuidelineCtrl',['$scope', 'Guideline', 'Section', '$stateParams', '$location', 'toastr', function ($scope, Guideline, Section, $stateParams, $location, toastr) {
  	var guidelineId = $stateParams.guidelineId;
    var baseUrl = '/guideline/';
    $scope.baseUrl = baseUrl;

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
      if($scope.guideline.guidelineId == null)
      {
        $scope.guideline.$save().then(function(data){
            toastr.success(data.title, 'Opprettet Retninglinje');
            $location.path(baseUrl + data.guidelineId);

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

    $scope.deleteSectionBtnClick = function(index) {
      var sectionToDelete = $scope.guideline.sections[index];
      Section.delete({ _id: sectionToDelete.sectionId })
      .$promise.then(function(){
        toastr.success(sectionToDelete.heading, 'Slettet');
        $scope.guideline.sections.splice(index, 1);
      }, function(error){
        handlePostError(error);
      });
    };

    $scope.addAuthorBtnClick = function() {
      $location.path(baseUrl + guidelineId + '/author/0');
    };

    $scope.removeAuthorBtnClick = function(){
      //TODO
    };

    $scope.addSectionBtnClick = function(){
      $location.path(baseUrl + guidelineId + '/section/0');
    };

    //Handles errors when post fails
    function handlePostError(error) {
        if (error.status == 401) {
            toastr.warning('Logg inn for å lagre');
        }
        else {
            toastr.error('Status code: ' + error.status + ' ' + error.statusText + ' Error data: ' + error.data.message, 'Error!');
        }
    }

  }]);

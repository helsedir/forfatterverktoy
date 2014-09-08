'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:SectionCtrl
 * @description
 * # SectionCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('SectionCtrl', ['$scope', 'Section', 'Guideline', '$routeParams', '$location', '$timeout', 'toastr', function ($scope, Section, Guideline, $routeParams, $location, $timeout, toastr) {

  	var sectionId = $routeParams.sectionId;
    var guidelineId = $routeParams.guidelineId;

    if(sectionId == 0)
    {
      $scope.section = new Section();
      Guideline.get({_id: guidelineId}, function(data){
        $scope.guideline = data;
      });
    }
    else
    {      
      Section.get({_id: sectionId}, function(data){
        $scope.section = data;
      });
    }
    
    $scope.updateSection = function() {
      if(typeof $scope.section.sectionId === 'undefined')
      {
        Guideline.addSection({_id: $scope.guideline.guidelineId }).$promise.then(function(data){
          toastr.success('Lagt til seksjon: ' + $scope.section.heading + ' til retningslinje: ' + $scope.guideline.title);
          $location.path('/guideline/'+ $scope.guideline.guidelineId);
        },
        function(error){
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
        Section.update({ _id: $scope.section.sectionId }, $scope.section)
        .$promise.then(function(data){

          toastr.success($scope.section.heading, 'Lagret');
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
  }]);

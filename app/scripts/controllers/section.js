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
    var parentSectionId = $routeParams.parentSectionId;
    
    if(sectionId != 0)
    {    
      Section.get({_id: sectionId}, function(data){
        $scope.section = data;
      });
    }
    
    $scope.updateSection = function() {
      if(typeof $scope.section.sectionId === 'undefined')
      {
        if(typeof guidelineId !== 'undefined')
        {
          Guideline.addSection({id: guidelineId }, $scope.section)
          .$promise.then(function(data){
            toastr.success('Opprettet seksjon: ' + data.heading);
            $location.path('/guideline/'+ guidelineId);
          },
          function(error){
            handlePostError(error);
          });
        }
        if(typeof parentSectionId !== 'undefined')
        {
          Section.addSection({id: parentSectionId }, $scope.section)
          .$promise.then(function(data){
            toastr.success('Opprettet seksjon: ' + data.heading);
            $location.path('/section/'+ parentSectionId);
          },
          function(error){
            handlePostError(error);
          });
        }
      }
      else
      {
        Section.update({ _id: $scope.section.sectionId }, $scope.section)
        .$promise.then(function(data){

          toastr.success($scope.section.heading, 'Lagret');
        }, function(error){
          handlePostError(error);
        });
      }
    };

    $scope.addSection = function(){
      $location.path('/section/0').search('parentSectionId', sectionId);
    };

    $scope.addRecommendation = function(){
      $location.path('/recommendation/0').search('sectionId', sectionId);
    };

    //Handles errors when post fails
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

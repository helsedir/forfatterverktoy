'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:SectionCtrl
 * @description
 * # SectionCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('SectionCtrl', ['$scope', 'Section', 'Guideline', '$routeParams', '$location', 'toastr', function ($scope, Section, Guideline, $routeParams, $location, toastr) {

  	var sectionId = $routeParams.sectionId;
    var guidelineId = $routeParams.guidelineId;
    var parentSectionId = $routeParams.parentSectionId;
    
    if(sectionId != 0)
    {    
      Section.get({_id: sectionId}, function(data){
        $scope.section = data;
      });
    }
    
    //If parentsection id is defined we are creating a section under a section
    //else if guidelineId is defined we are creating a section directly under a guideline
    $scope.updateOrCreateSection = function() {
      if(sectionId == 0)
      {
        if(typeof(parentSectionId) != 'undefined' && parentSectionId != null)
        {
          createSection(Section, parentSectionId);
        }
        else if(typeof(guidelineId) != 'undefined' && guidelineId != null)
        {
          createSection(Guideline, guidelineId);
        }
      }
      else
      {
        updateSection(Section, $scope.section.sectionId);
      }
    };

    //Creates a new Section
    //The resource provided must have an addSection method.
    var createSection = function (resource, id){
      resource.addSection({id: id }, $scope.section)
      .$promise.then(function(data){
        toastr.success(data.heading, 'Opprettet seksjon');
        $location.path('/section/'+ data.sectionId);
      },
      function(error){
        handlePostError(error);
      });
    };

    var updateSection = function(resource, id){
        resource.update({ _id: id }, $scope.section)
        .$promise.then(function(data){
          toastr.success(data.heading, 'Lagret');
        }, function(error){
          handlePostError(error);
        });
    };

    $scope.addSectionBtnClick = function(){
      $location.path('/section/0').search('parentSectionId', sectionId);
    };

    $scope.addRecommendationBtnClick = function(){
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

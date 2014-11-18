'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:SectionCtrl
 * @description
 * # SectionCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('SectionCtrl', ['$scope', 'Section', 'Guideline', 'Recommendation', '$stateParams', '$location', 'toastr', 'ModalService', '$rootScope', 'Crud', function ($scope, Section, Guideline, Recommendation, $stateParams, $location, toastr, ModalService, $rootScope, Crud) {
    if($stateParams.guidelineId){
      $scope.guidelineId = $stateParams.guidelineId;
    }
    
  	var sectionId = $stateParams.sectionId;
    var guidelineId = $stateParams.guidelineId;
    var parentSectionId = $location.search().parentSectionId;
    var baseUrl = '/guideline/' + guidelineId + '/section/';
    $scope.baseUrl = baseUrl;
    $scope.parentId = 1;

    $rootScope.sectionLabel = ' - ny seksjon';

    if(sectionId != 0)
    {
      Section.getSection(sectionId).then(function () {
        $scope.section = Section.section;
        $rootScope.sectionLabel = ' - ' + Section.section.heading;
      });

    }
    
    //If parentsection id is defined we are creating a section under a section
    //else if guidelineId is defined we are creating a section directly under a guideline
    $scope.updateOrCreateSection = function() {
      if(sectionId == 0)
      {
        //section under section
        if(typeof(parentSectionId) != 'undefined' && parentSectionId != null)
        {
          Section.addSection(parentSectionId, $scope.section).then(function () {
            $location.path(baseUrl + Section.section.sectionId);
          });
        }
        //section under guideline
        else if(typeof(guidelineId) != 'undefined' && guidelineId != null)
        {
          Guideline.addSection(guidelineId, $scope.section).then(function () {
            $location.path(baseUrl + Section.section.sectionId);
          });
        }
      }
      else
      {
        Section.updateSection($scope.section);
      }
    };


    $scope.addSectionBtnClick = function(){
      $location.path(baseUrl + '0').search('parentSectionId', sectionId);
    };

    $scope.addRecommendationBtnClick = function(){
      $location.path(baseUrl + sectionId + '/recommendation/0');
    };

    $scope.deleteSectionBtnClick = function(index){
      var sectionToDelete;

      //If deleting childsection
      if(typeof index != 'undefined'){
        sectionToDelete = $scope.section.childSections[index];
      }
      else{
        sectionToDelete = $scope.section;
      }

      //Delete the section
      Section.deleteSection(sectionToDelete).then(function (){
        if(typeof index != 'undefined'){
          $scope.section.childSections.splice(index, 1);
        }
        else{
          $location.path('/guideline/'+guidelineId);
        }
      });
    };

    $scope.deleteRecommendationBtnClick = function(index){
      var recommendationToDelete = $scope.section.recommendations[index];
      Recommendation.delete({_id: recommendationToDelete.recommendationId})
          .$promise.then(function(){

            toastr.success(recommendationToDelete.heading, 'Slettet');
            $scope.section.recommendations.splice(index, 1);

            }, function(error){
            Crud.handlePostError(error);
          });
      };

    $scope.editSortOrderRecommendationBtnClick = function() {
            ModalService.showModal({
                templateUrl: 'common/_sortordermodal.html',
                controller: ['ModalService', '$scope', 'recommendations', 'Recommendation', function (ModalService, $scope, recommendations, Recommendation) {
                  //set this scope's recommendations to the injected recommendations
                  $scope.resource = recommendations;

                  $scope.save = function (){

                    //Loop through the elements and update if sortorder is changed
                    for (var i =  0; i < $scope.resource.length; i++) {
                      if($scope.resource[i].sortOrder != i){ //If we changed the sort order of the element
                        console.log($scope.resource[i].heading+' changed sortorder from: '+$scope.resource[i].sortOrder+' to: '+i);
                        $scope.resource[i].sortOrder = i;
                        Recommendation.update({ _id: $scope.resource[i].recommendationId }, $scope.resource[i])
                        .$promise.then(function(){
                          
                        });
                      }
                    }
                  };
                }],
                inputs: {
                  recommendations: $scope.section.recommendations //inject the recommendations
                }
            }).then(function(modal) {
                modal.element.modal();
                
            });
        };

    $scope.editSortOrderRecommendationBtnClick.$inject = ['$scope', 'ModalService'];

    $scope.editSortOrderSubsectionsBtnClick = function() {
            ModalService.showModal({
                templateUrl: 'common/_sortordermodal.html',
                controller: ['ModalService', '$scope', 'sections', 'Section', function (ModalService, $scope, sections, Section) {
                  //set this scope's sections to the injected sections
                  $scope.resource = sections;

                  $scope.save = function (){

                    //Loop through the elements and update if sortorder is changed
                    for (var i =  0; i < $scope.resource.length; i++) {
                      if($scope.resource[i].sortOrder != i){ //If we changed the sort order of the element
                        console.log($scope.resource[i].heading+' changed sortorder from: '+$scope.resource[i].sortOrder+' to: '+i);
                        $scope.resource[i].sortOrder = i;
                        Section.update({ _id: $scope.resource[i].sectionId }, $scope.resource[i])
                        .$promise.then(function(){
                          
                        });
                      }
                    }
                  };
                }],
                inputs: {
                  sections: $scope.section.childSections //inject the sections
                }
            }).then(function(modal) {
                modal.element.modal();
                
            });
        };

    $scope.editSortOrderSubsectionsBtnClick.$inject = ['$scope', 'ModalService'];

    }]);

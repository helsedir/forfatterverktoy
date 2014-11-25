'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:GuidelineCtrl
 * @description
 * # GuidelineCtrl
 * Controller of the webUiApp  
 */
angular.module('webUiApp')
  .controller('GuidelineCtrl',['$scope', 'Guideline', 'Section', 'Author', '$stateParams', '$location', 'toastr', 'ModalService', '$rootScope',  function ($scope, Guideline, Section, Author, $stateParams, $location, toastr, ModalService, $rootScope) {
  	var guidelineId = $stateParams.guidelineId;
    var baseUrl = '/guideline/';
    $scope.baseUrl = baseUrl;

    if(guidelineId == 0)
    {
      //$scope.guideline = new Guideline();
      $rootScope.guidelineLabel = ' - ny retningslinje';
    }
    else
    {
      Guideline.getGuideline(guidelineId).then(function () {
        $scope.guideline = Guideline.guideline;
      });
    }
    
    $scope.updateOrCreateGuideline = function () {
      if($scope.guideline.guidelineId == null)
      {
        Guideline.saveGuideline($scope.guideline).then(function () {
          $location.path(baseUrl + Guideline.guideline.guidelineId);
        });
      }
      else
      {
        Guideline.updateGuideline($scope.guideline);
      }
    };



    $scope.removeGuidelineBtnClick = function() {
      Guideline.deleteGuideline($scope.guideline).then(function () {
        $location.path('/');
      });
    };

    $scope.deleteSectionBtnClick = function(index) {
      var sectionToDelete = Guideline.guideline.sections[index];
      Guideline.deleteSection(sectionToDelete);
    };


    $scope.addSectionBtnClick = function(){
      $location.path(baseUrl + guidelineId + '/section/0');
    };

    $scope.addAuthorBtnClick = function() {

            ModalService.showModal({
                templateUrl: 'components/guidelines/guideline/_authormodal.html',
                controller: ['ModalService', '$scope', 'Author', 'Guideline', function (ModalService, $scope, Author, Guideline) {
                  $scope.isCollapsed = true;

                  function checkCheckboxes () {
                    for (var i = $scope.authors.length - 1; i >= 0; i--) {
                      //If author is in guideline, make checkbox checked
                      if(Guideline.isAuthorInGuideline($scope.authors[i])){
                        $scope.authors[i].checked = true;
                      }
                    }
                  }

                  Author.getAuthors().then(function () {
                    $scope.authors = Author.authors;
                    checkCheckboxes();
                  });

                  $scope.openCreateAuthor = function (){
                    $scope.isCollapsed = !$scope.isCollapsed;
                    //$scope.author = new Author();
                  };

                  $scope.saveAuthor = function (){
                    Author.createAuthor($scope.author).then(function () {
                      Author.author.checked = true;
                      //$scope.author = Author.author;

                      //$scope.author.checked = true;
                      //$scope.authors.push($scope.author);
                      $scope.isCollapsed = true;
                    });
                  };
                  
                  //Called when we close the modal
                   $scope.save = function () {
                    for (var i = $scope.authors.length - 1; i >= 0; i--) {
                      //If checked and not in guideline add author to guideline
                      if($scope.authors[i].checked && !Guideline.isAuthorInGuideline($scope.authors[i])){
                        Guideline.addAuthor($scope.authors[i]);
                      }
                      //If unchecked remove author from guideline
                      else if(!$scope.authors[i].checked && Guideline.isAuthorInGuideline($scope.authors[i])){
                        Guideline.removeAuthor($scope.authors[i]);
                      }
                    }
                   };

                }]
            }).then(function(modal) {
                modal.element.modal();
                
            });
        };
    $scope.addAuthorBtnClick.$inject = ['$scope', 'ModalService'];

    $scope.editSortOrderBtnClick = function() {
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
                        Section.updateSection($scope.resource[i]);
                      }
                    }
                  };
                }],
                inputs: {
                  sections: Guideline.guideline.sections //inject the sections
                }
            }).then(function(modal) {
                modal.element.modal();
                
            });
        };

    $scope.editSortOrderBtnClick.$inject = ['$scope', 'ModalService'];


  }]);

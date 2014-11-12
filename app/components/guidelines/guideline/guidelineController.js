'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:GuidelineCtrl
 * @description
 * # GuidelineCtrl
 * Controller of the webUiApp  
 */
angular.module('webUiApp')
  .controller('GuidelineCtrl',['$scope', 'Guideline', 'Section', 'Author', '$stateParams', '$location', 'toastr', 'ModalService', '$rootScope', 'Crud',  function ($scope, Guideline, Section, Author, $stateParams, $location, toastr, ModalService, $rootScope, Crud) {
  	var guidelineId = $stateParams.guidelineId;
    var baseUrl = '/guideline/';
    $scope.baseUrl = baseUrl;

    if(guidelineId == 0)
    {
      $scope.guideline = new Guideline();
      $rootScope.guidelineLabel = ' - ny retningslinje';
    }
    else
    {      
      Guideline.get({_id: guidelineId}, function(data){
        $scope.guideline = data;
        $rootScope.guidelineLabel = ' - ' + data.shortTitle;
      });
    }
    
    $scope.updateOrCreateGuideline = function() {
      if($scope.guideline.guidelineId == null)
      {
        $scope.guideline.$save().then(function(data){
            toastr.success(data.title, 'Opprettet Retninglinje');
            $location.path(baseUrl + data.guidelineId);

        }, function (error){
            Crud.handlePostError(error);
        });
      }
      else
      {
        Guideline.update({ _id: $scope.guideline.guidelineId }, $scope.guideline)
        .$promise.then(function(){

          toastr.success($scope.guideline.title, 'Lagret');
        }, function(error){
            Crud.handlePostError(error);
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
            Crud.handlePostError(error);
        });
    };

    $scope.deleteSectionBtnClick = function(index) {
      var sectionToDelete = $scope.guideline.sections[index];
      Section.delete({ _id: sectionToDelete.sectionId })
      .$promise.then(function(){
        toastr.success(sectionToDelete.heading, 'Slettet');
        $scope.guideline.sections.splice(index, 1);
      }, function(error){
        Crud.handlePostError(error);
      });
    };


    $scope.addSectionBtnClick = function(){
      $location.path(baseUrl + guidelineId + '/section/0');
    };

    $scope.addAuthorBtnClick = function() {

            ModalService.showModal({
                templateUrl: 'components/guidelines/guideline/_authormodal.html',
                controller: ['ModalService', '$scope', 'Author', function (ModalService, $scope, Author) {
                  $scope.isCollapsed = true;
                  Author.query().$promise.then(function(authors){
                  $scope.authors = authors;
                  for (var i = $scope.authors.length - 1; i >= 0; i--) {
                    //If author is in guideline, make checkbox checked
                    if(isAuthorInGuideline($scope.authors[i])){
                      $scope.authors[i].checked = true;
                    }
                  }
                  }, function(error){
                    toastr.error(error.data.message, 'Error!');
                  });

                  $scope.openCreateAuthor = function (){

                    $scope.isCollapsed = !$scope.isCollapsed;
                    $scope.author = new Author();
                  };

                  $scope.saveAuthor = function (){
                    //$scope.author = new Author();
                    $scope.author.$save().then(function (data){
                      
                      toastr.success(data.name, 'Opprettet forfatter');
                      data.checked = true;
                      $scope.authors.push(data);
                      $scope.isCollapsed = true;
                    
                    }, function (error){

                      Crud.handlePostError(error);

                    });
                  };
                  

                   $scope.save = function () {
                    for (var i = $scope.authors.length - 1; i >= 0; i--) {
                      //If checked and not in guideline add author to guideline
                      if($scope.authors[i].checked && !isAuthorInGuideline($scope.authors[i])){
                        addAuthorToGuideline($scope.authors[i]);
                      }
                      //If unchecked remove author from guideline
                      else if(!$scope.authors[i].checked && isAuthorInGuideline($scope.authors[i])){
                        removeAuthorFromGuideline($scope.authors[i]);
                      }
                    }
                   };

                }]
            }).then(function(modal) {
                modal.element.modal();
                
            });
        };
    $scope.addAuthorBtnClick.$inject = ['$scope', 'ModalService'];

    //Check if author passed is in this guideline's collection of authors
    function isAuthorInGuideline(author) {
      for (var i = $scope.guideline.authors.length - 1; i >= 0; i--) {
        if($scope.guideline.authors[i].authorId == author.authorId){
          return true;
        }
      }
    }

    function addAuthorToGuideline(author){
      Guideline.addAuthor({id: $scope.guideline.guidelineId, authorId: author.authorId})
      .$promise.then(function(){ 
        toastr.success(author.name, 'La til forfatter i retningslinje');
        $scope.guideline.authors.push(author);
      }, 
      function(error){
        Crud.handlePostError(error);
      });
    }

    function removeAuthorFromGuideline(author){
      Guideline.deleteAuthor({id: $scope.guideline.guidelineId, authorId: author.authorId})
      .$promise.then(function(){
        toastr.success(author.name,'Fjernet forfatter fra retningslinjen');
        //Remove author from list
        for (var i = $scope.guideline.authors.length - 1; i >= 0; i--) {
          if($scope.guideline.authors[i].authorId == author.authorId){
            $scope.guideline.authors.splice(i, 1);
          }
        }
      },
      function(error){
        Crud.handlePostError(error);
      });
    }

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
                        Section.update({ _id: $scope.resource[i].sectionId }, $scope.resource[i])
                        .$promise.then(function(){
                          
                        });
                      }
                    }
                  };
                }],
                inputs: {
                  sections: $scope.guideline.sections //inject the sections
                }
            }).then(function(modal) {
                modal.element.modal();
                
            });
        };

    $scope.editSortOrderBtnClick.$inject = ['$scope', 'ModalService'];


  }]);

'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:GuidelineCtrl
 * @description
 * # GuidelineCtrl
 * Controller of the webUiApp  
 */
angular.module('webUiApp')
  .controller('GuidelineCtrl',['$scope','ModalService', 'Guideline', 'Section', 'Author', '$stateParams', '$location', 'toastr', function ($scope, ModalService, Guideline, Section, Author, $stateParams, $location, toastr) {
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

    //$scope.addAuthorBtnClick = function() {
    //  $location.path(baseUrl + guidelineId + '/author/0');
    //};

    $scope.removeAuthorBtnClick = function(){
      //TODO
    };

    $scope.addSectionBtnClick = function(){
      $location.path(baseUrl + guidelineId + '/section/0');
    };

    $scope.addAuthorBtnClick = function() {

            ModalService.showModal({
                templateUrl: 'views/partials/_authormodal.html',
                controller: function($scope, close){
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
                  

                  $scope.close = function(result) {
                    close(result, 500); // close, but give 500ms for bootstrap to animate
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

                  $scope.addNewAuthorBtnClick = function(){
                    close('Cancel');
                    $location.path(baseUrl + guidelineId + '/author/0');
                  };

                }
            }).then(function(modal) {
                modal.element.modal();
                
            });
        };

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
        handlePostError(error);
      });
    }

    function removeAuthorFromGuideline(author){
      Guideline.deleteAuthor({id: $scope.guideline.guidelineId, authorId: author.authorId})
      .$promise.then(function(){
        toastr.success(author.name,'Slettet forfatter');
        //Remove author from list
        for (var i = $scope.guideline.authors.length - 1; i >= 0; i--) {
          if($scope.guideline.authors[i].authorId == author.authorId){
            $scope.guideline.authors.splice(i, 1);
          }
        }
      },
      function(error){
        handlePostError(error);
      });
    }

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

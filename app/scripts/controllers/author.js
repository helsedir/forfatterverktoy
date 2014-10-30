'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:AddauthorCtrl
 * @description
 * # AddauthorCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('AuthorCtrl', ['$scope', 'Guideline', 'Author', '$stateParams', '$location', 'toastr', 'ModalService', 'Crud', function ($scope, Guideline, Author, $stateParams, $location, toastr, ModalService, Crud){
  	var authorId = $stateParams.authorId;
  	var guidelineId = $stateParams.guidelineId;

  	//Get all authors
    Author.query(function(data){
      $scope.authors = data;
    });
      
  	$scope.updateOrCreateAuthor = function() {
      if(authorId > 0){
        
        Author.update({_id: authorId}, $scope.author)
        .$promise.then(function (data){
          
          toastr.success(data.name, 'Lagret forfatter');
          $location.path('/guideline/'+guidelineId);
        
        }, function (error){
          Crud.handlePostError(error);
        });
      }
      else{
        $scope.author.$save().then(function(data){ 
        toastr.success(data.name, 'Opprettet forfatter');
        
        //If the request comes from a guideline
        if(guidelineId){

          $location.path('/guideline/'+guidelineId);

        }
      }, 
      function(error){
        Crud.handlePostError(error);
      });
      }
  	};

    $scope.updateAuthorBtnClick = function(authorId, arrayIndex){
      //Get the author we want to edit
      Author.get({_id: authorId}).$promise.then(function(author){
        
        ModalService.showModal({
              templateUrl: 'views/partials/_createorupdateauthormodal.html',
              controller: ['$scope', 'author', 'Author', 'close', function ($scope, author, Author, close) {
                
                //set this scope's author to the injected author
                $scope.author = author;

                //update author
                $scope.save = function () {
                 Author.update({_id: author.authorId}, $scope.author)
                 .$promise.then(function (data){
        
                   toastr.success(data.name, 'Lagret forfatter');
                   close(data, 500); // close, but give 500ms for bootstrap to animate

                 }, function (error){
                   Crud.handlePostError(error);
                 });
                };
              }],
              inputs: {
                author: author //inject the author returned from promise object
              }
            }).then(function(modal) {
              //it's a bootstrap element, use 'modal' to show it
              modal.element.modal();
              modal.close.then(function(result) {
              //set author element in scope to the updated element
              $scope.authors[arrayIndex] = result;
            });
          });
      });
    };

    $scope.createAuthorBtnClick = function (){
      ModalService.showModal({
        templateUrl: 'views/partials/_createorupdateauthormodal.html',
        controller: ['$scope', 'Author', 'close', function ($scope, Author, close){
          
          $scope.author = new Author();
          $scope.save = function (){

            $scope.author.$save().then(function (data){
              
              toastr.success(data.name, 'Opprettet forfatter');
              close(data, 500);
            
            }, function (error){

              Crud.handlePostError(error);

            });
          };

        }]
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (result){
          $scope.authors.push(result);
        });
      });
    };

    $scope.deleteAuthorBtnClick = function(index){
      var authorToDelete = $scope.authors[index];
      Author.delete({ _id: authorToDelete.authorId })
      .$promise.then(function(){
        toastr.success(authorToDelete.name, 'Slettet');
        $scope.authors.splice(index, 1);
      }, function(error){
        Crud.handlePostError(error);
      });
    };
  }]);
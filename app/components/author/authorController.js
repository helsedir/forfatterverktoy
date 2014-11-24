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
      Author.getAuthors().then(function () {
        $scope.authors = Author.authors;
      })

    $scope.updateAuthorBtnClick = function(authorId, arrayIndex){
      //Get the author we want to edit
      Author.getAuthor(authorId).then(function () {
        var author = Author.author;
        
        ModalService.showModal({
              templateUrl: 'components/author/_createorupdateauthormodal.html',
              controller: ['$scope', 'author', 'index', 'Author', 'close', function ($scope, author, index, Author, close) {
                
                //set this scope's author to the injected author
                $scope.author = author;

                //update author
                $scope.save = function () {
                  Author.updateAuthor($scope.author, index).then(function () {
                    close(500);
                  });
                };
              }],
              inputs: {
                index: arrayIndex,
                author: author //inject the author returned from promise object
              }
            }).then(function(modal) {
              //it's a bootstrap element, use 'modal' to show it
              modal.element.modal();
              modal.close.then(function() {

            });
          });
      });
    };

    $scope.createAuthorBtnClick = function (){
      ModalService.showModal({
        templateUrl: 'components/author/_createorupdateauthormodal.html',
        controller: ['$scope', 'Author', 'close', function ($scope, Author, close){
          
          //$scope.author = new Author();
          $scope.save = function (){
            Author.createAuthor($scope.author).then(function (){
              close(500);
            });
          };

        }]
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (){
        });
      });
    };

    $scope.deleteAuthorBtnClick = function(index){
      var authorToDelete = $scope.authors[index];
      Author.deleteAuthor(authorToDelete.authorId, index);
    };
  }]);
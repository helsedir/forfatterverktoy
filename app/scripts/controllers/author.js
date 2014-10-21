'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:AddauthorCtrl
 * @description
 * # AddauthorCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('AuthorCtrl', ['$scope', 'Guideline', 'Author', '$stateParams', '$location', 'toastr', 'ModalService', function ($scope, Guideline, Author, $stateParams, $location, toastr, ModalService){
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
          handlePostError(error);
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
        handlePostError(error);
      });
      }
  	};

    $scope.updateAuthorBtnClick = function(authorId, arrayIndex){
      //Get the author we want to edit
      Author.get({_id: authorId}).$promise.then(function(author){
        
        ModalService.showModal({
              templateUrl: "views/partials/_createorupdateauthormodal.html",
              controller: ['$scope', 'author', 'Author', 'close', function ($scope, author, Author, close) {
                $scope.author = author;

                $scope.save = function () {
                 Author.update({_id: author.authorId}, $scope.author)
                 .$promise.then(function (data){
        
                   //toastr.success(data.name, 'Lagret forfatter');
                   close(data, 500); // close, but give 500ms for bootstrap to animate

                   
                 
                 }, function (error){
                   handlePostError(error);
                 });
                };
               

              }],
              inputs: {
                author: author
              }
            }).then(function(modal) {

    //it's a bootstrap element, use 'modal' to show it
    modal.element.modal();
    modal.close.then(function(result) {
      $scope.authors[arrayIndex] = result;
      console.log(result);
    });
  });
      });
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
  	}
  }]);
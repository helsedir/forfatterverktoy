'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:AddauthorCtrl
 * @description
 * # AddauthorCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('AuthorCtrl', ['$scope', 'Guideline', 'Author', '$stateParams', '$location', 'toastr', function ($scope, Guideline, Author, $stateParams, $location, toastr){
  	var authorId = $stateParams.authorId;
  	var guidelineId = $stateParams.guidelineId;

  	if(authorId > 0){
      Author.get({_id: authorId}, function(data){
  		  $scope.author = data;
      });
  	}
    else{
      $scope.author = new Author();
    } 

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
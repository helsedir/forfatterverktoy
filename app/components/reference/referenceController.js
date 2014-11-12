/**
 * Created by gkarabeg on 25.09.2014.
 */
/**
 * Created by gkarabeg on 24.09.2014.
 */
'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:ReferenceCtrl
 * @description
 * # ReferenceCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('ReferenceCtrl', ['$scope', 'Reference', '$stateParams', 'Recommendation', '$location', '$timeout', 'toastr', 'ModalService', 'Crud', function ($scope, Reference, $stateParams, Recommendation, $location, $timeout, toastr, ModalService, Crud) {
        var guidelineId = $stateParams.guidelineId;
        var sectionId = $stateParams.sectionId;
        var recommendationId = $stateParams.recommendationId;
        var referenceId = $stateParams.referenceId;
       
        //Get all authors
        Reference.query(function(data){
            $scope.references = data;
        });
        

        $scope.updateOrCreateReference = function() {
            if(referenceId != 0){
                Reference.update({ _id: referenceId }, $scope.reference)
                    .$promise.then(function(data){
                        toastr.success(data.summary, 'Lagret');
                        $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/reference/'+ data.referenceId);
                    }, function(error){
                        Crud.handlePostError(error);
                    });
            }

            else if(typeof(recommendationId) != 'undefined' && recommendationId != null)
            {
                Recommendation.addReference({id: recommendationId}, $scope.reference)
                    .$promise.then(function(data){
                        toastr.success(data.summary, 'Opprettet Reference');
                        $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/reference/'+ data.referenceId);
                    },function(error){
                        Crud.handlePostError(error);
                    });
            }
        };

        $scope.updateReferenceBtnClick = function(referenceId, arrayIndex){
          //Get the reference we want to edit
          Reference.get({_id: referenceId}).$promise.then(function(reference){
            
            ModalService.showModal({
                  templateUrl: 'components/reference/_createorupdatereferencemodal.html',
                  controller: ['$scope', 'Reference', 'reference', 'close', function ($scope, Reference, reference, close) {
                    
                    //set this scope's reference to the injected reference
                    $scope.reference = reference;

                    //update reference
                    $scope.save = function () {
                     Reference.update({_id: reference.referenceId}, $scope.reference)
                     .$promise.then(function (data){
            
                       toastr.success(data.name, 'Lagret referanse');
                       close(data, 500); // close, but give 500ms for bootstrap to animate

                     }, function (error){
                       Crud.handlePostError(error);
                     });
                    };
                  }],
                  inputs: {
                    reference: reference //inject the reference returned from promise object
                  }
                }).then(function(modal) {
                  //it's a bootstrap element, use 'modal' to show it
                  modal.element.modal();
                  modal.close.then(function(result) {
                  //set reference element in scope to the updated element
                  $scope.references[arrayIndex] = result;
                });
              });
          });
        };

        $scope.createReferenceBtnClick = function (){
          ModalService.showModal({
            templateUrl: 'components/reference/_createorupdatereferencemodal.html',
            controller: ['$scope', 'Reference', 'close', function ($scope, Reference, close){
              
              $scope.reference = new Reference();
              $scope.save = function (){

                $scope.reference.$save().then(function (data){
                  
                  toastr.success(data.name, 'Opprettet referanse');
                  close(data, 500);
                
                }, function (error){

                  Crud.handlePostError(error);

                });
              };

            }]
          }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result){
              $scope.references.push(result);
            });
          });
        };

        $scope.deleteReferenceBtnClick = function(index){
          var referenceToDelete = $scope.references[index];
          Reference.delete({ _id: referenceToDelete.referenceId })
          .$promise.then(function(){
            toastr.success(referenceToDelete.name, 'Slettet');
            $scope.references.splice(index, 1);
          }, function(error){
            Crud.handlePostError(error);
          });
        };

    }]);

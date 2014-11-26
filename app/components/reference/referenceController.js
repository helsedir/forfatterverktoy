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

        //Get all references
        Reference.getReferences().then(function () {
           $scope.references = Reference.references;
        });


        $scope.updateReferenceBtnClick = function(referenceId, arrayIndex){
          //Get the reference we want to edit
            Reference.getReference(referenceId).then(function () {
                var reference = Reference.reference;
            
            ModalService.showModal({
                  templateUrl: 'components/reference/_createorupdatereferencemodal.html',
                  controller: ['$scope', 'Reference', 'reference', 'index', 'close', function ($scope, Reference, reference, index, close) {
                    
                    //set this scope's reference to the injected reference
                    $scope.reference = reference;

                    //update reference
                    $scope.save = function () {
                        Reference.updateReference($scope.reference, index).then(function () {
                            close(500);
                        });
                    };
                  }],
                  inputs: {
                      index: arrayIndex,
                    reference: reference //inject the reference returned from promise object
                  }
                }).then(function(modal) {
                  //it's a bootstrap element, use 'modal' to show it
                  modal.element.modal();
                  modal.close.then(function() {

                });
              });
          });
        };

        $scope.createReferenceBtnClick = function (){
          ModalService.showModal({
            templateUrl: 'components/reference/_createorupdatereferencemodal.html',
            controller: ['$scope', 'Reference', 'close', function ($scope, Reference, close){
              

              $scope.save = function (){
                Reference.createReference($scope.reference);
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
            Reference.deleteReference(referenceToDelete.referenceId, index);
        };

    }]);

'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:RecommendationCtrl
 * @description
 * # RecommendationCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('RecommendationCtrl', ['$scope', 'Recommendation', 'Pico', 'EmrInfo', 'Reference', 'KeyInfo', '$stateParams', '$location', 'Section', 'toastr', 'ModalService', function ($scope, Recommendation, Pico, EmrInfo, Reference, KeyInfo, $stateParams, $location, Section, toastr, ModalService) {
        $scope.guidelineId = $stateParams.guidelineId;
        $scope.sectionId = $stateParams.sectionId;
        
        var guidelineId = $stateParams.guidelineId;
        var recommendationId = $stateParams.recommendationId;
        var sectionId = $stateParams.sectionId;

        if (recommendationId != 0) {
            Recommendation.get({_id: recommendationId}, function (data) {
                $scope.recommendation = data;
                if($scope.recommendation.strength == null)
                  $scope.recommendation.strength = 'null';
            });
        }
        else {
          $scope.recommendation = new Recommendation();
          $scope.recommendation.strength = 'null';
        }



        $scope.updateOrCreateRecommendation = function () {

            if (recommendationId != 0) {
                Recommendation.update({ _id: recommendationId }, $scope.recommendation)
                    .$promise.then(function (data) {
                        toastr.success(data.heading, 'Lagret');
                        $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/' + data.recommendationId);
                    }, function (error) {
                        handlePostError(error);
                    });
            }

            else if (typeof(sectionId) != 'undefined' && sectionId != null) {
                Section.addRecommendation({id: sectionId}, $scope.recommendation)
                    .$promise.then(function (data) {
                        toastr.success(data.heading, 'Opprettet anbefaling');
                        $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/' + data.recommendationId);
                    }, function (error) {
                        handlePostError(error);
                    });
            }
        };

        $scope.deleteRecommendationBtnClick = function () {
            var recommendationToDelete = $scope.recommendation;
            Recommendation.delete({ _id: recommendationToDelete.recommendationId })
                .$promise.then(function(){
                toastr.success('Anbefaling: ' + recommendationToDelete.heading, 'Slettet');
                $location.path('/guideline/' + guidelineId + '/section/'+sectionId);
              }, function(error){
                handlePostError(error);
              });
        };

        $scope.addPicoBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/0');
        };

        $scope.deletePicoBtnClick = function (index){
            var picoToDelete = $scope.recommendation.picos[index];
            Pico.delete({ _id: picoToDelete.picoId })
                .$promise.then(function(){
                toastr.success('Pico: ' + picoToDelete.picoId, 'Slettet');
                $scope.recommendation.picos.splice(index, 1);
              }, function(error){
                handlePostError(error);
              });
        };

        $scope.addEmrInfoBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/emrinfo/0');
        };

        $scope.deleteEmrInfoBtnClick = function (index){
            var emrInfoToDelete = $scope.recommendation.emrInfo[index];
            EmrInfo.delete({ _id: emrInfoToDelete.emrInfoId })
                .$promise.then(function(){
                toastr.success('emrInfo: ' + emrInfoToDelete.emrInfoId, 'Slettet');
                $scope.recommendation.emrInfo.splice(index, 1);
              }, function(error){
                handlePostError(error);
              });
        };

        $scope.addKeyInfoBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/keyinfo/0');
        };

        $scope.deleteKeyInfoBtnClick = function (index){
            var keyInfoToDelete = $scope.recommendation.keyInfo[index];
            KeyInfo.delete({ _id: keyInfoToDelete.keyInfoId })
                .$promise.then(function(){
                toastr.success('keyInfo: ' + keyInfoToDelete.keyInfoId, 'Slettet');
                $scope.recommendation.keyInfo.splice(index, 1);
              }, function(error){
                handlePostError(error);
              });
        };

        $scope.editReferencesBtnClick = function() {

                ModalService.showModal({
                    templateUrl: 'views/partials/_referencesmodal.html',
                    controller: ['ModalService', '$scope', 'Reference', function (ModalService, $scope, Reference) {
                      $scope.isCollapsed = true;
                      Reference.query().$promise.then(function(references){
                      $scope.references = references;
                      for (var i = $scope.references.length - 1; i >= 0; i--) {
                        //If reference is in recommendation, make checkbox checked
                        if(isReferenceInRecommendation($scope.references[i])){
                          $scope.references[i].checked = true;
                        }
                      }
                      }, function(error){
                        toastr.error(error.data.message, 'Error!');
                      });

                       $scope.save = function () {
                        for (var i = $scope.references.length - 1; i >= 0; i--) {
                          //If checked and not in recommendation add reference to recommendation
                          if($scope.references[i].checked && !isReferenceInRecommendation($scope.references[i])){
                            addReferenceToRecommendation($scope.references[i]);
                          }
                          //If unchecked remove reference from recommendation
                          else if(!$scope.references[i].checked && isReferenceInRecommendation($scope.references[i])){
                            removeReferenceFromRecommendation($scope.references[i]);
                          }
                        }
                       };

                      $scope.openCreateReference = function (){
                        $scope.isCollapsed = !$scope.isCollapsed;
                        $scope.reference = new Reference();
                      };

                      $scope.saveReference = function (){
                        //$scope.author = new Author();
                        $scope.reference.$save().then(function (data){
                          
                          toastr.success('Opprettet referanse');
                          data.checked = true;
                          $scope.references.push(data);
                          $scope.isCollapsed = true;
                        
                        }, function (error){

                          handlePostError(error);

                        });
                      };

                    }]
                }).then(function(modal) {
                    modal.element.modal();
                    
                });
            };
        $scope.editReferencesBtnClick.$inject = ['$scope', 'ModalService'];

        //Check if reference passed is in this recommendation's collection of references
        function isReferenceInRecommendation(reference) {
          for (var i = $scope.recommendation.references.length - 1; i >= 0; i--) {
            if($scope.recommendation.references[i].referenceId == reference.referenceId){
              return true;
            }
          }
        }

        function addReferenceToRecommendation(reference){
          Recommendation.addReference({id: $scope.recommendation.recommendationId, referenceId: reference.referenceId})
          .$promise.then(function(){ 
            toastr.success('La til referanse i anbefalingen');
            $scope.recommendation.references.push(reference);
          }, 
          function(error){
            handlePostError(error);
          });
        }

        function removeReferenceFromRecommendation(reference){
          Recommendation.deleteReference({id: $scope.recommendation.recommendationId, referenceId: reference.referenceId})
          .$promise.then(function(){
            toastr.success('Fjernet referanse fra anbefalingen');
            //Remove reference from list
            for (var i = $scope.recommendation.references.length - 1; i >= 0; i--) {
              if($scope.recommendation.references[i].referenceId == reference.referenceId){
                $scope.recommendation.references.splice(i, 1);
              }
            }
          },
          function(error){
            handlePostError(error);
          });
        }

        $scope.editSortOrderPicosBtnClick = function() {
                ModalService.showModal({
                    templateUrl: 'views/partials/_sortordermodal.html',
                    controller: ['ModalService', '$scope', 'picos', 'Pico', function (ModalService, $scope, picos, Pico) {
                      //set this scope's picos to the injected picos
                      $scope.resource = picos;

                      $scope.save = function (){

                        //Loop through the elements and update if sortorder is changed
                        for (var i =  0; i < $scope.resource.length; i++) {
                          if($scope.resource[i].sortOrder != i){ //If we changed the sort order of the element
                            console.log($scope.resource[i].heading+' changed sortorder from: '+$scope.resource[i].sortOrder+' to: '+i);
                            $scope.resource[i].sortOrder = i;
                            Pico.update({ _id: $scope.resource[i].picoId }, $scope.resource[i])
                            .$promise.then(function(){
                              
                            });
                          }
                        }
                      };
                    }],
                    inputs: {
                      picos: $scope.recommendation.picos //inject the picos
                    }
                }).then(function(modal) {
                    modal.element.modal();
                    
                });
            };

        $scope.editSortOrderPicosBtnClick.$inject = ['$scope', 'ModalService'];

        $scope.editSortOrderReferencesBtnClick = function() {
                ModalService.showModal({
                    templateUrl: 'views/partials/_sortordermodal.html',
                    controller: ['ModalService', '$scope', 'references', 'Reference', function (ModalService, $scope, references, Reference) {
                      //set this scope's references to the injected references
                      $scope.resource = references;

                      $scope.save = function (){

                        //Loop through the elements and update if sortorder is changed
                        for (var i =  0; i < $scope.resource.length; i++) {
                          if($scope.resource[i].sortOrder != i){ //If we changed the sort order of the element
                            console.log($scope.resource[i].heading+' changed sortorder from: '+$scope.resource[i].sortOrder+' to: '+i);
                            $scope.resource[i].sortOrder = i;
                            Reference.update({ _id: $scope.resource[i].referenceId }, $scope.resource[i])
                            .$promise.then(function(){
                              
                            });
                          }
                        }
                      };
                    }],
                    inputs: {
                      references: $scope.recommendation.references //inject the references
                    }
                }).then(function(modal) {
                    modal.element.modal();
                    
                });
            };

        $scope.editSortOrderReferencesBtnClick.$inject = ['$scope', 'ModalService'];

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
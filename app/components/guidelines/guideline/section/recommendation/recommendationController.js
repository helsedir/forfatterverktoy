'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:RecommendationCtrl
 * @description
 * # RecommendationCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('RecommendationCtrl', ['$scope', 'Recommendation', 'Pico', 'EmrInfo', 'Reference', 'KeyInfo', '$stateParams', '$location', 'Section', 'toastr', 'ModalService', '$rootScope', 'Crud', function ($scope, Recommendation, Pico, EmrInfo, Reference, KeyInfo, $stateParams, $location, Section, toastr, ModalService, $rootScope, Crud) {
        $scope.guidelineId = $stateParams.guidelineId;
        $scope.sectionId = $stateParams.sectionId;
        
        var guidelineId = $stateParams.guidelineId;
        var recommendationId = $stateParams.recommendationId;
        var sectionId = $stateParams.sectionId;


        if (recommendationId != 0) {
            Recommendation.get({_id: recommendationId}, function (data) {
                $scope.recommendation = data;
                if($scope.recommendation.strength == null){
                  $scope.recommendation.strength = 'null';
                }
                $rootScope.recommendationLabel = ' - ' + data.heading; //update breadcrumb
            });
        }
        else {
          $scope.recommendation = new Recommendation();
          $scope.recommendation.strength = 'null';
          $rootScope.recommendationLabel = ' - ny anbefaling'; //update breadcrumb
        }



        $scope.updateOrCreateRecommendation = function () {

            if (recommendationId != 0) {
                Recommendation.update({ _id: recommendationId }, $scope.recommendation)
                    .$promise.then(function (data) {
                        $rootScope.recommendationLabel = ' - ' + data.heading; //update breadcrumb
                        toastr.success(data.heading, 'Lagret');
                        $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/' + data.recommendationId);
                    }, function (error) {
                        Crud.handlePostError(error);
                    });
            }

            else if (typeof(sectionId) != 'undefined' && sectionId != null) {
                Section.addRecommendation({id: sectionId}, $scope.recommendation)
                    .$promise.then(function (data) {
                        $rootScope.recommendationLabel = ' - ' + data.heading; //update breadcrumb
                        toastr.success(data.heading, 'Opprettet anbefaling');
                        $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/' + data.recommendationId);
                    }, function (error) {
                        Crud.handlePostError(error);
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
                Crud.handlePostError(error);
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
                Crud.handlePostError(error);
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
                Crud.handlePostError(error);
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
                Crud.handlePostError(error);
              });
        };

        $scope.changePublishedStage = function () {
            Recommendation.publish({id:$scope.recommendation.recommendationId, publishedStage:$scope.recommendation.publishedStage})
        .$promise.then(function(){
            toastr.success('Endret publiseringsstatus');
        }, function(error){
            Crud.handlePostError(error);
        });

        };

        $scope.editReferencesBtnClick = function() {

                ModalService.showModal({
                    templateUrl: 'components/guidelines/guideline/section/recommendation/_referencesmodal.html',
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

                          Crud.handlePostError(error);

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
            Crud.handlePostError(error);
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
            Crud.handlePostError(error);
          });
        }
    }]);
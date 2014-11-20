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
            Recommendation.getRecommendation(recommendationId).then(function () {
                $scope.recommendation = Recommendation.recommendation;
                if($scope.recommendation.strength == null){
                    $scope.recommendation.strength = 'null';
                }
                $rootScope.recommendationLabel = ' - ' + Recommendation.recommendation.heading; //update breadcrumb
            });
        }
        else {
          //$scope.recommendation = new Recommendation();
          //$scope.recommendation.strength = 'null';
          $rootScope.recommendationLabel = ' - ny anbefaling'; //update breadcrumb
        }

        $scope.updateOrCreateRecommendation = function () {

            if (recommendationId != 0) {
                Recommendation.updateRecommendation($scope.recommendation);
            }

            else if (typeof(sectionId) != 'undefined' && sectionId != null) {
                Section.addRecommendation(sectionId, $scope.recommendation).then(function (data) {
                    $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/' + data.recommendationId);
                });
            }
        };

        $scope.deleteRecommendationBtnClick = function () {
            Recommendation.deleteRecommendation($scope.recommendation).then(function () {
                $location.path('/guideline/' + guidelineId + '/section/'+sectionId);
            });
        };

        $scope.addPicoBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/0');
        };

        $scope.deletePicoBtnClick = function (index){
            Recommendation.deletePico(index, $scope.recommendation.picos[index]);
        };

        $scope.addEmrInfoBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/emrinfo/0');
        };

        $scope.deleteEmrInfoBtnClick = function (index){
            Recommendation.deleteEmrInfo(index, $scope.recommendation.emrinfo[index]);
        };

        $scope.addKeyInfoBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/keyinfo/0');
        };

        $scope.deleteKeyInfoBtnClick = function (index){
            Recommendation.deleteKeyInfo(index, $scope.recommendation.keyinfo[index]);
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
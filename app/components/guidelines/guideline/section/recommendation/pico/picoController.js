'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicoCtrl
 * @description
 * # PicoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('PicoCtrl', ['$scope', 'Pico', 'PicoCode', 'PicoOutcome', '$stateParams', 'Recommendation', '$location', '$timeout', 'toastr', 'Crud','ModalService', function ($scope, Pico, PicoCode, PicoOutcome, $stateParams, Recommendation, $location, $timeout, toastr, Crud, ModalService) {
        var guidelineId = $stateParams.guidelineId;
        var sectionId = $stateParams.sectionId;
        var recommendationId = $stateParams.recommendationId;
        var picoId = $stateParams.picoId;
        var baseUrl = '/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/';

        $scope.baseUrl = baseUrl;

        

        if (picoId != 0) {
            Pico.getPico(picoId).then(function () {
                $scope.pico = Pico.pico;
            });
        }

        $scope.updateOrCreatePico = function () {
            if (picoId != 0) {
                Pico.updatePico($scope.pico);
            }

            else if (typeof(recommendationId) != 'undefined' && recommendationId != null) {
                Recommendation.addPico(recommendationId, $scope.pico).then(function (data) {
                    $location.path(baseUrl + data.picoId);
                });
            }
        };

        $scope.addPicoCodeBtnClick = function () {
            $location.path(baseUrl + picoId + '/picoCode/0');
        };

        $scope.deletePicoCodeBtnClick = function (index){
            Pico.deletePicoCode(index);
        };

        $scope.addPicoOutcomeBtnClick = function () {
            $location.path(baseUrl + picoId + '/picooutcome/0');
        };

        $scope.deletePicoOutcomeBtnClick = function (index){
            Pico.deletePicoOutcome(index);
        };

        $scope.deletePicoBtnClick = function () {
            Pico.deletePico(Pico.pico).then(function () {
                $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId);
            });
        };

        $scope.taxCodeBtnClick = function(picoType){
            
            ModalService.showModal({
                  templateUrl: 'components/guidelines/guideline/section/recommendation/pico/_taxonomycodemodal.html',
                  controller: ['$scope', 'close', 'picoId', 'picoType', 'PicoCode', 'Pico', 'TaxonomyCode',  function ($scope, close, picoId, picoType, PicoCode, Pico, TaxonomyCode) {
                    //start with form collapsed
                    $scope.isCollapsed = true;
                    $scope.picoType = picoType;
                    //create new objects
                    //$scope.taxonomyCode = new TaxonomyCode();
                    //$scope.picoCode = new PicoCode();
                    $scope.picoCodes = [];

                    var addPicoCodes = function (pico){
                        var picoCodes = [];
                        //Add all the picoCodes which are the picotype we are using (population = 0, intervention = 1, control = 2, outcome = 3)
                        for(var i=0; i < pico.picoCodes.length; i++){                
                            if(pico.picoCodes[i].picoType == picoType){
                                picoCodes.push(pico.picoCodes[i]);
                            }
                        }
                        return picoCodes;
                    };

                    //get the pico
                    var pico;
                      Pico.getPico(picoId).then(function () {
                          pico = Pico.pico;
                          $scope.picoCodes = addPicoCodes(pico);
                          //If the list is empty, open the accordion
                          if($scope.picoCodes.length == 0){
                              $scope.isCollapsed = false;
                          }
                          else{
                              $scope.isCollapsed = true;
                          }
                      });

                    $scope.openCreateCode = function () {
                        $scope.isCollapsed = !$scope.isCollapsed;
                    };

                    $scope.removeTaxonomyCodeBtnClick = function (parentIndex, index){
                        var taxonomyCodeToDelete = $scope.picoCodes[parentIndex].taxonomyCodes[index];
                        TaxonomyCode.deleteTaxonomyCode(taxonomyCodeToDelete.taxonomyCodeId).then(function () {
                            $scope.picoCodes[parentIndex].taxonomyCodes.splice(index, 1);
                        });
                    };

                    $scope.saveCode = function () {
                        $scope.taxonomyCode.schemaSystem = $scope.picoCode.ontologyName;
                        $scope.taxonomyCode.schemaId = $scope.picoCode.ontologyName;
                        $scope.picoCode.picoType = picoType;
                        
                        //Add taxonomyCode
                        var addTaxonomyCode = function(picoCodeId, arrayIndex){
                            PicoCode.addTaxonomyCode(picoCodeId, $scope.taxonomyCode).then(function (data) {
                                $scope.picoCodes[arrayIndex].taxonomyCodes.push(data);
                            });
                        };


                        //Check if picocode ontologyname already exists.
                        var picoCodeId = 0;
                        var arrayIndex = 0;
                        for (var i = 0; i < $scope.picoCodes.length; i++) {
                            if($scope.picoCodes[i].ontologyName == $scope.picoCode.ontologyName){
                                picoCodeId = $scope.picoCodes[i].picoCodeId;
                                arrayIndex = i;
                            }
                        }

                        //If picocode ontologyname not found, create new picocode and add the taxonomyCode
                        if(picoCodeId == 0){
                            Pico.addPicoCode(picoId, $scope.picoCode).then(function (data) {
                                $scope.picoCodes.push(data);
                                //create new taxonomy codes array
                                $scope.picoCodes[$scope.picoCodes.length-1].taxonomyCodes = [];
                                addTaxonomyCode(data.picoCodeId, $scope.picoCodes.length-1);
                            });
                        }
                        else{
                            //Add taxonomycode to existing picocode
                            addTaxonomyCode(picoCodeId, arrayIndex);
                        }
                        $scope.isCollapsed = true;
                       
                    };

                  }],
                  inputs: {
                    picoId: $scope.pico.picoId,
                    picoType: picoType 
                  }
                }).then(function(modal) {
                    //it's a bootstrap element, use 'modal' to show it
                    modal.element.modal();
                    modal.close.then(function() {
                  
                    });
                });
            };
    }]);

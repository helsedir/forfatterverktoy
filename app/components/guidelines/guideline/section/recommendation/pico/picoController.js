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
            Pico.get({_id: picoId}, function (data) {
                $scope.pico = data;
            });
        }

        $scope.updateOrCreatePico = function () {
            if (picoId != 0) {
                Pico.update({ _id: picoId }, $scope.pico)
                    .$promise.then(function (data) {
                        toastr.success(data.summary, 'Lagret');
                        $location.path(baseUrl + data.picoId);
                    }, function (error) {
                        Crud.handlePostError(error);
                    });
            }

            else if (typeof(recommendationId) != 'undefined' && recommendationId != null) {
                Recommendation.addPico({id: recommendationId}, $scope.pico)
                    .$promise.then(function (data) {
                        toastr.success(data.summary, 'Opprettet Pico');
                        $location.path(baseUrl + data.picoId);
                    }, function (error) {
                        Crud.handlePostError(error);
                    });
            }
        };

        $scope.addPicoCodeBtnClick = function () {
            $location.path(baseUrl + picoId + '/picoCode/0');
        };

        $scope.deletePicoCodeBtnClick = function (index){
            var picoCodeToDelete = $scope.pico.picoCodes[index];
            PicoCode.delete({ _id: picoCodeToDelete.picoCodeId })
                .$promise.then(function(){
                toastr.success('picoCode: ' + picoCodeToDelete.picoCodeId, 'Slettet');
                $scope.pico.picoCodes.splice(index, 1);
              }, function(error){
                Crud.handlePostError(error);
              });
        };

        $scope.addPicoOutcomeBtnClick = function () {
            $location.path(baseUrl + picoId + '/picooutcome/0');

        };

        $scope.deletePicoOutcomeBtnClick = function (index){
            var picoOutcomeToDelete = $scope.pico.picoOutcomes[index];
            PicoOutcome.delete({ _id: picoOutcomeToDelete.picoOutcomeId })
                .$promise.then(function(){
                toastr.success('Pico Outcome: ' + picoOutcomeToDelete.picoOutcomeId, 'Slettet');
                $scope.pico.picoOutcomes.splice(index, 1);
              }, function(error){
                Crud.handlePostError(error);
              });
        };

        $scope.deletePicoBtnClick = function () {
            var picoToDelete = $scope.pico;
            Pico.delete({ _id: picoToDelete.picoId })
                .$promise.then(function(){
                toastr.success('pico: ' + picoToDelete.picoId, 'Slettet');
                $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId);
            }, function(error){
                Crud.handlePostError(error);
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
                    $scope.taxonomyCode = new TaxonomyCode();
                    $scope.picoCode = new PicoCode();
                    $scope.picoCodes = [];

                    var addPicoCodes = function (pico){
                        var picoCodes = []
                        //Add all the picoCodes which are the picotype we are using (population = 0, intervention = 1, control = 2, outcome = 3)
                        for(var i=0; i < pico.picoCodes.length; i++){                
                            if(pico.picoCodes[i].picoType == picoType){
                                picoCodes.push(pico.picoCodes[i]);
                            }
                        }
                        return picoCodes;
                    }

                    //get the pico
                    var pico; 
                    Pico.get({_id: picoId}).$promise.then(function (data){
                        pico = data;
                        $scope.picoCodes = addPicoCodes(pico);
                        //If the list is empty, open the accordion
                        if($scope.picoCodes.length == 0){ 
                            $scope.isCollapsed = false;
                        }
                        else{
                            $scope.isCollapsed = true;
                        }
                    })
                   

                    
                           

                    $scope.openCreateCode = function () {
                        $scope.isCollapsed = !$scope.isCollapsed;
                    };

                    $scope.removeTaxonomyCodeBtnClick = function (parentIndex, index){
                        var taxonomyCodeToDelete = $scope.picoCodes[parentIndex].taxonomyCodes[index];
                        TaxonomyCode.delete({ _id: taxonomyCodeToDelete.taxonomyCodeId })
                            .$promise.then(function(){
                            toastr.success('taxonomyCode: ' + taxonomyCodeToDelete.taxonomyCodeId, 'Slettet');
                            $scope.picoCodes[parentIndex].taxonomyCodes.splice(index, 1);
                          }, function(error){
                            Crud.handlePostError(error);
                          });
                    };

                    $scope.saveCode = function () {
                        $scope.taxonomyCode.schemaSystem = $scope.picoCode.ontologyName;
                        $scope.taxonomyCode.schemaId = $scope.picoCode.ontologyName;
                        $scope.picoCode.picoType = picoType;

                        //Add taxonomyCode
                        var addTaxonomyCode = function(picoCodeId, arrayIndex){
                            PicoCode.addTaxonomyCode({id: picoCodeId}, $scope.taxonomyCode)
                            .$promise.then(function (data) {
                                toastr.success(data.name, 'Opprettet TaxonomyCode');

                                $scope.picoCodes[arrayIndex].taxonomyCodes.push(data);
                                
                                }, function (error) {
                                        Crud.handlePostError(error);
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
                            Pico.addPicoCode({id: picoId}, $scope.picoCode)
                            .$promise.then(function(data){
                                toastr.success(data.name, 'Opprettet picocode');
                                console.log(data);
                                $scope.picoCodes.push(data);
                                //create new taxonomy codes array
                                $scope.picoCodes[$scope.picoCodes.length-1].taxonomyCodes = [];
                                addTaxonomyCode(data.picoCodeId, $scope.picoCodes.length-1);
                            }, function (error) {
                                    Crud.handlePostError(error);
                            });
                        }
                        else{
                            //Add taxonomycode to existing picocode
                            addTaxonomyCode(picoCodeId, arrayIndex);
                        }
                        //Clear the form
                        //$scope.taxcode.$setPristine;
                        $scope.taxonomyCode = {};
                        $scope.picoCode = {};
                        //Close the panel
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

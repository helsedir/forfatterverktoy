'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:TaxonomycodeCtrl
 * @description
 * # TaxonomycodeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('TaxonomycodeCtrl', ['$scope', 'TaxonomyCode', '$stateParams', 'PicoCode', '$location', '$timeout', 'toastr', function ($scope, TaxonomyCode, $stateParams, PicoCode, $location, $timeout, toastr) {

        $scope.taxonomyCode ={};
        $scope.taxonomyCode.schemaId = ($location.search()).schemaId;
        $scope.taxonomyCode.schemaSystem = ($location.search()).schemaSystem;

        var guidelineId = $stateParams.guidelineId;
        var sectionId = $stateParams.sectionId;
        var recommendationId = $stateParams.recommendationId;
        var picoCodeId = $stateParams.picoCodeId;
        var picoId = $stateParams.picoId;
        var taxonomyCodeId = $stateParams.taxonomyCodeId;

        var baseUrl = '/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/'+picoId+'/picoCode/'+picoCodeId+'/taxonomyCode/';
        $scope.baseUrl = baseUrl;

        if (taxonomyCodeId != 0) {
            TaxonomyCode.get({_id: taxonomyCodeId}, function (data) {
                $scope.taxonomyCode = data;
            });
        }

        $scope.updateOrCreateTaxonomyCode = function () {
            if (taxonomyCodeId != 0) {
                TaxonomyCode.update({ _id: taxonomyCodeId }, $scope.taxonomyCode)
                    .$promise.then(function (data) {
                        toastr.success(data.name, 'Lagret');
                        $location.path(baseUrl + data.taxonomyCodeId);
                    }, function (error) {
                        handlePostError(error);
                    });
            }

            else if (typeof(picoCodeId) != 'undefined' && picoCodeId != null) {
                PicoCode.addTaxonomyCode({id: picoCodeId}, $scope.taxonomyCode)
                    .$promise.then(function (data) {
                        toastr.success(data.name, 'Opprettet TaxonomyCode');
                        $location.path(baseUrl + data.taxonomyCodeId);
                    }, function (error) {
                        handlePostError(error);
                    });
            }
        };

        $scope.removeTaxonomyCodeBtnClick = function () {

                var taxonomyCodeToDelete = $scope.taxonomyCode;
                TaxonomyCode.delete({ _id: taxonomyCodeToDelete.taxonomyCodeId })
                    .$promise.then(function(){
                    toastr.success('taxonomy code: ' + taxonomyCodeToDelete.picoId, 'Slettet');
                    $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/'+picoId+'/picoCode/'+picoCodeId);
                }, function(error){
                    handlePostError(error);
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
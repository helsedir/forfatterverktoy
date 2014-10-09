'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicoCtrl
 * @description
 * # PicoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('PicoCtrl', ['$scope', 'Pico', 'PicoCode', 'PicoOutcome', 'PicoContinousOutcome', '$stateParams', 'Recommendation', '$location', '$timeout', 'toastr', function ($scope, Pico, PicoCode, PicoContinousOutcome, PicoOutcome, $stateParams, Recommendation, $location, $timeout, toastr) {
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
                        handlePostError(error);
                    });
            }

            else if (typeof(recommendationId) != 'undefined' && recommendationId != null) {
                Recommendation.addPico({id: recommendationId}, $scope.pico)
                    .$promise.then(function (data) {
                        toastr.success(data.summary, 'Opprettet Pico');
                        $location.path(baseUrl + data.picoId);
                    }, function (error) {
                        handlePostError(error);
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
                handlePostError(error);
              });
        };

        $scope.addPicoContinuousOutcomeBtnClick = function () {
            $location.path(baseUrl + picoId + '/picocontinousoutcome/0');
        };

        $scope.deletePicoContinuousOutcomeBtnClick = function (index){
            var picoContinuousOutcomeToDelete = $scope.pico.picoContinousOutcomes[index];
            PicoContinousOutcome.delete({ _id: picoContinuousOutcomeToDelete.picoContinousOutcomeId })
                .$promise.then(function(){
                toastr.success('Pico Continuous Outcome: ' + picoContinuousOutcomeToDelete.picoContinousOutcomeId, 'Slettet');
                $scope.pico.picoContinousOutcomes.splice(index, 1);
              }, function(error){
                handlePostError(error);
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
                handlePostError(error);
              });
        };

        $scope.deletePicoBtnClick = function () {
            var picoToDelete = $scope.pico;
            Pico.delete({ _id: picoToDelete.picoId })
                .$promise.then(function(){
                toastr.success('pico: ' + picoToDelete.picoId, 'Slettet');
                $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId);
            }, function(error){
                handlePostError(error);
            });
        };

        function handlePostError(error) {
            if (error.status == 401) {
                toastr.warning('Logg inn for å lagre');
            }
            else {
                toastr.error('Status code: ' + error.status + ' ' + error.statusText + ' Error data: ' + error.data.message, 'Error!');
            }
        }
    }]);

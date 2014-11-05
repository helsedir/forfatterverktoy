'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicoCtrl
 * @description
 * # PicoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('PicoCtrl', ['$scope', 'Pico', 'PicoCode', 'PicoOutcome', '$stateParams', 'Recommendation', '$location', '$timeout', 'toastr', 'Crud', function ($scope, Pico, PicoCode, PicoOutcome, $stateParams, Recommendation, $location, $timeout, toastr, Crud) {
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
    }]);

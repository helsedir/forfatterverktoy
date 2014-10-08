'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicoCtrl
 * @description
 * # PicoCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('PicoCtrl', ['$scope', 'Pico', '$stateParams', 'Recommendation', '$location', '$timeout', 'toastr', function ($scope, Pico, $stateParams, Recommendation, $location, $timeout, toastr) {
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

        $scope.addPicoContinuousOutcomeBtnClick = function () {
            $location.path(baseUrl + picoId + '/picocontinousoutcome/0');
        };

        $scope.addPicoOutcomeBtnClick = function () {
            $location.path(baseUrl + picoId + '/picooutcome/0');
        };

        $scope.removePico = function () {

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

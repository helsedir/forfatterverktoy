
'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicoOutcomeCtrl
 * @description
 * # PicoOutcomeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('PicoOutcomeCtrl', ['$scope', 'PicoOutcome', '$stateParams', 'Pico', '$location', '$timeout', 'toastr', 'Crud', function ($scope, PicoOutcome, $stateParams, Pico, $location, $timeout, toastr, Crud) {
        var guidelineId = $stateParams.guidelineId;
        var sectionId = $stateParams.sectionId;
        var recommendationId = $stateParams.recommendationId;
        var picoId = $stateParams.picoId;
        var picoOutcomeId = $stateParams.picoOutcomeId;

        var baseUrl = '/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/'+picoId+'/picooutcome/';
        $scope.baseUrl = baseUrl;

        Pico.getPico(picoId).then(function () {
            $scope.pico = Pico.pico;
        })
        
        if(picoOutcomeId != 0){
            PicoOutcome.getPicoOutcome(picoOutcomeId).then(function () {
                $scope.picoOutcome = PicoOutcome.picoOutcome;
            })
        }

        $scope.updateOrCreatePicoOutcome = function() {
            if(picoOutcomeId != 0){
                PicoOutcome.updatePicoOutcome($scope.picoOutcome);
            }

            else if(typeof(picoId) != 'undefined' && picoId != null)
            {
                Pico.addPicoOutcome(picoId, $scope.picoOutcome).then(function (data) {
                    $location.path(baseUrl + data.picoOutcomeId);
                });
            }
        };

        $scope.deletePicoOutcomeBtnClick = function() {
            PicoOutcome.deletePicoOutcome($scope.picoOutcome).then(function () {
                $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/'+picoId);
            });
        };

    }]);

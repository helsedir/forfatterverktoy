
'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicoOutcomeCtrl
 * @description
 * # PicoOutcomeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('PicoOutcomeCtrl', ['$scope', 'PicoOutcome', '$stateParams', 'Pico', '$location', '$timeout', 'toastr', function ($scope, PicoOutcome, $stateParams, Pico, $location, $timeout, toastr) {
        var guidelineId = $stateParams.guidelineId;
        var sectionId = $stateParams.sectionId;
        var recommendationId = $stateParams.recommendationId;
        var picoId = $stateParams.picoId;
        var picoOutcomeId = $stateParams.picoOutcomeId;

        var baseUrl = '/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/'+picoId+'/picooutcome/';
        $scope.baseUrl = baseUrl;

        if(picoOutcomeId != 0){
            PicoOutcome.get({_id: picoOutcomeId}, function(data){
                $scope.picoOutcome = data;
            });
        }

        $scope.updateOrCreatePicoOutcome = function() {
            if(picoOutcomeId != 0){
                PicoOutcome.update({ _id: picoOutcomeId }, $scope.picoOutcome)
                    .$promise.then(function(data){
                        toastr.success(data.summary, 'Lagret');
                        $location.path(baseUrl + data.picoOutcomeId);
                    }, function(error){
                        handlePostError(error);
                    });
            }

            else if(typeof(picoId) != 'undefined' && picoId != null)
            {
                Pico.addPicoOutcome({id: picoId}, $scope.picoOutcome)
                    .$promise.then(function(data){
                        toastr.success(data.summary, 'Opprettet PicoOutcome');
                        $location.path(baseUrl + data.picoOutcomeId);
                    },function(error){
                        handlePostError(error);
                    });
            }
        };


        $scope.deletePicoOutcomeBtnClick = function() {
            var picoOutcomeToDelete = $scope.picoOutcome;
            PicoOutcome.delete({ _id: picoOutcomeToDelete.picoOutcomeId })
                .$promise.then(function(){
                toastr.success('Pico Outcome: ' + picoOutcomeToDelete.picoOutcomeId, 'Slettet');
                $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/'+picoId);
            }, function(error){
                handlePostError(error);
            });
        };

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

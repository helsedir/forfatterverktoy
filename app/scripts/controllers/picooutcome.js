/**
 * Created by gkarabeg on 24.09.2014.
 */
/**
 * Created by gkarabeg on 24.09.2014.
 */
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

        var picoOutcomeId = $stateParams.picoOutcomeId;
        var picoId = $location.search().picoId;

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
                        $location.path('/picooutcome/'+ data.picoOutcomeId);
                    }, function(error){
                        handlePostError(error);
                    });
            }

            else if(typeof(picoId) != 'undefined' && picoId != null)
            {
                Pico.addPicoOutcome({id: picoId}, $scope.picoOutcome)
                    .$promise.then(function(data){
                        toastr.success(data.summary, 'Opprettet PicoOutcome');
                        $location.path('/picooutcome/'+ data.picoOutcomeId);
                    },function(error){
                        handlePostError(error);
                    });
            }
        };


        $scope.removePicoOutcome = function(index) {

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

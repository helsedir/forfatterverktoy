/**
 * Created by gkarabeg on 24.09.2014.
 */
'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:PicoContinousOutcomeCtrl
 * @description
 * # PicoContinousOutcomeCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('PicoContinousOutcomeCtrl', ['$scope', 'PicoContinousOutcome', '$stateParams', 'Pico', '$location', '$timeout', 'toastr', function ($scope, PicoContinousOutcome, $stateParams, Pico, $location, $timeout, toastr) {

        var picoContinousOutcomeId = $stateParams.picoContinousOutcomeId;
        var picoId = $location.search().picoId;

        if(picoContinousOutcomeId != 0){
            PicoContinousOutcome.get({_id: picoContinousOutcomeId}, function(data){
                $scope.picoContinousOutcome = data;
            });
        }

        $scope.updateOrCreatePicoContinousOutcome = function() {
            if(picoContinousOutcomeId != 0){
                PicoContinousOutcome.update({ _id: picoContinousOutcomeId }, $scope.picoContinousOutcome)
                    .$promise.then(function(data){
                        toastr.success(data.summary, 'Lagret');
                        $location.path('/picocontinousoutcome/'+ data.picoContinousOutcomeId);
                    }, function(error){
                        handlePostError(error);
                    });
            }

            else if(typeof(picoId) != 'undefined' && picoId != null)
            {
                Pico.addPicoContinousOutcome({id: picoId}, $scope.picoContinousOutcome)
                    .$promise.then(function(data){
                        toastr.success(data.summary, 'Opprettet PicoContinousOutcome');
                        $location.path('/picocontinousoutcome/'+ data.picoContinousOutcomeId);
                    },function(error){
                        handlePostError(error);
                    });
            }
        };


        $scope.removePicoContinousOutcome = function() {

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

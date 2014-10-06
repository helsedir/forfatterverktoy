/**
 * Created by gkarabeg on 25.09.2014.
 */
/**
 * Created by gkarabeg on 24.09.2014.
 */
'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:ReferenceCtrl
 * @description
 * # ReferenceCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('ReferenceCtrl', ['$scope', 'Reference', '$stateParams', 'Recommendation', '$location', '$timeout', 'toastr', function ($scope, Reference, $stateParams, Recommendation, $location, $timeout, toastr) {

        var referenceId = $stateParams.referenceId;
        var recommendationId = $location.search().recommendationId;

        if(referenceId !== 0){
            Reference.get({_id: referenceId}, function(data){
                $scope.reference = data;
            });
        }

        $scope.updateOrCreateReference = function() {
            if(referenceId !== 0){
                Reference.update({ _id: referenceId }, $scope.reference)
                    .$promise.then(function(data){
                        toastr.success(data.summary, 'Lagret');
                        $location.path('/reference/'+ data.referenceId);
                    }, function(error){
                        handlePostError(error);
                    });
            }

            else if(typeof(recommendationId) !== 'undefined' && recommendationId !== null)
            {
                Recommendation.addReference({id: recommendationId}, $scope.reference)
                    .$promise.then(function(data){
                        toastr.success(data.summary, 'Opprettet Reference');
                        $location.path('/reference/'+ data.referenceId);
                    },function(error){
                        handlePostError(error);
                    });
            }
        };


        $scope.removeReference = function(index) {

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

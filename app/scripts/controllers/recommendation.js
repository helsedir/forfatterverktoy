'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:RecommendationCtrl
 * @description
 * # RecommendationCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('RecommendationCtrl', ['$scope', 'Recommendation', '$stateParams', '$location', 'Section', 'toastr', function ($scope, Recommendation, $stateParams, $location, Section, toastr) {

        var recommendationId = $stateParams.recommendationId;
        var sectionId = $location.search().sectionId;

        if (recommendationId != 0) {
            Recommendation.get({_id: recommendationId}, function (data) {
                $scope.recommendation = data;
            });
        }

        $scope.updateOrCreateRecommendation = function () {

            if (recommendationId != 0) {
                Recommendation.update({ _id: recommendationId }, $scope.recommendation)
                    .$promise.then(function (data) {
                        toastr.success(data.heading, 'Lagret');
                        $location.path('/recommendation/' + data.recommendationId);
                    }, function (error) {
                        handlePostError(error);
                    });
            }

            else if (typeof(sectionId) != 'undefined' && sectionId != null) {
                Section.addRecommendation({id: sectionId}, $scope.recommendation)
                    .$promise.then(function (data) {
                        toastr.success(data.heading, 'Opprettet anbefaling');
                        $location.path('/recommendation/' + data.recommendationId);
                    }, function (error) {
                        handlePostError(error);
                    });
            }
        };

        $scope.removeRecommendation = function (index) {

        };

        $scope.addPicoBtnClick = function () {
            $location.path('/pico/0').search('recommendationId', recommendationId);
        };

        $scope.addEmrInfoBtnClick = function () {
            $location.path('/emrinfo/0').search('recommendationId', recommendationId);
        };

        $scope.addKeyInfoBtnClick = function () {
            $location.path('/keyinfo/0').search('recommendationId', recommendationId);
        };

        $scope.addReferenceBtnClick = function () {
            $location.path('/reference/0').search('recommendationId', recommendationId);
        };
        //Handles errors when post fails
        function handlePostError(error) {
            if (error.status == 401) {
                toastr.warning('Logg inn for å lagre');
            }
            else {
                toastr.error('Status code: ' + error.status + ' ' + error.statusText + ' Error data: ' + error.data.message, 'Error!');
            }
        }
    }]);

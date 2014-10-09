'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:RecommendationCtrl
 * @description
 * # RecommendationCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
    .controller('RecommendationCtrl', ['$scope', 'Recommendation', 'Pico', 'EmrInfo', 'Reference', 'KeyInfo', '$stateParams', '$location', 'Section', 'toastr', function ($scope, Recommendation, Pico, EmrInfo, Reference, KeyInfo, $stateParams, $location, Section, toastr) {
        $scope.guidelineId = $stateParams.guidelineId;
        $scope.sectionId = $stateParams.sectionId;
        
        var guidelineId = $stateParams.guidelineId;
        var recommendationId = $stateParams.recommendationId;
        var sectionId = $stateParams.sectionId;

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
                        $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/' + data.recommendationId);
                    }, function (error) {
                        handlePostError(error);
                    });
            }
        };

        $scope.deleteRecommendationBtnClick = function () {
            var recommendationToDelete = $scope.recommendation;
            Recommendation.delete({ _id: recommendationToDelete.recommendationId })
                .$promise.then(function(){
                toastr.success('Anbefaling: ' + recommendationToDelete.heading, 'Slettet');
                $location.path('/guideline/' + guidelineId + '/section/'+sectionId);
              }, function(error){
                handlePostError(error);
              });
        };

        $scope.addPicoBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/pico/0');
        };

        $scope.deletePicoBtnClick = function (index){
            var picoToDelete = $scope.recommendation.picos[index];
            Pico.delete({ _id: picoToDelete.picoId })
                .$promise.then(function(){
                toastr.success('Pico: ' + picoToDelete.picoId, 'Slettet');
                $scope.recommendation.picos.splice(index, 1);
              }, function(error){
                handlePostError(error);
              });
        };

        $scope.addEmrInfoBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/emrinfo/0');
        };

        $scope.deleteEmrInfoBtnClick = function (index){
            var emrInfoToDelete = $scope.recommendation.emrInfo[index];
            EmrInfo.delete({ _id: emrInfoToDelete.emrInfoId })
                .$promise.then(function(){
                toastr.success('emrInfo: ' + emrInfoToDelete.emrInfoId, 'Slettet');
                $scope.recommendation.emrInfo.splice(index, 1);
              }, function(error){
                handlePostError(error);
              });
        };

        $scope.addKeyInfoBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/keyinfo/0');
        };

        $scope.deleteKeyInfoBtnClick = function (index){
            var keyInfoToDelete = $scope.recommendation.keyInfo[index];
            KeyInfo.delete({ _id: keyInfoToDelete.keyInfoId })
                .$promise.then(function(){
                toastr.success('keyInfo: ' + keyInfoToDelete.keyInfoId, 'Slettet');
                $scope.recommendation.keyInfo.splice(index, 1);
              }, function(error){
                handlePostError(error);
              });
        };

        $scope.addReferenceBtnClick = function () {
            $location.path('/guideline/'+guidelineId+'/section/'+sectionId+'/recommendation/'+recommendationId+'/reference/0');
        };

        $scope.deleteReferenceBtnClick = function (index){
            var referenceToDelete = $scope.recommendation.references[index];
            Reference.delete({ _id: referenceToDelete.referenceId })
                .$promise.then(function(){
                toastr.success('reference: ' + referenceToDelete.referenceId, 'Slettet');
                $scope.recommendation.references.splice(index, 1);
              }, function(error){
                handlePostError(error);
              });
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
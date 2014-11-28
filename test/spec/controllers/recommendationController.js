'use strict';

describe('Controller: RecommendationCtrl', function () {

    // load the controller's module
    beforeEach(module('webUiApp'));

    var RecommendationController;
    var scope;
    var location;
    var Recommendation;
    var $stateParams;


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $location, _Recommendation_, _$stateParams_) {
        scope = $rootScope.$new();
        location = $location;
        Recommendation = _Recommendation_;
        $stateParams = _$stateParams_;

        $stateParams.guidelineId = 1;
        $stateParams.sectionId = 1;
        $stateParams.recommendationId = 1;

        RecommendationController = $controller('RecommendationCtrl', {
            $scope: scope
        });
    }));

    describe('addPicoBtnClick', function () {
        it('should change location to add pico', function() {
            expect(location.path()).toEqual('');
            scope.addPicoBtnClick();
            expect(location.path()).toEqual('/guideline/1/section/1/recommendation/1/pico/0');
        })
    });

    describe('deletePicoBtnClick', function () {
        it('should call delete pico', function () {
            scope.recommendation = {
                recommendationId: 1,
                picos: [{picoId: 1}]
            };
            Recommendation.recommendation = {
                recommendationId: 1,
                picos: [{picoId: 1}]
            };
            spyOn(Recommendation, 'deletePico')
            scope.deletePicoBtnClick(0);
            expect(Recommendation.deletePico).toHaveBeenCalledWith({picoId: 1});
        })
    })

    describe('addEmrInfoBtnClick', function () {
        it('should change location to add emrInfo', function() {
            expect(location.path()).toEqual('');
            scope.addEmrInfoBtnClick();
            expect(location.path()).toEqual('/guideline/1/section/1/recommendation/1/emrinfo/0');
        })
    });

    describe('addKeyInfoBtnClick', function () {
        it('should change location to add keyInfo', function() {
            expect(location.path()).toEqual('');
            scope.addKeyInfoBtnClick();
            expect(location.path()).toEqual('/guideline/1/section/1/recommendation/1/keyinfo/0');
        })
    });

});
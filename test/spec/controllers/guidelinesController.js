'use strict';

describe('Controller: GuidelinesCtrl', function () {

    // load the controller's module
    beforeEach(module('webUiApp'));

    var GuidelinesController;
    var scope;
    var location;
    var Guideline;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $location, _Guideline_) {
        scope = $rootScope.$new();
        location = $location;
        Guideline = _Guideline_;
        GuidelinesController = $controller('GuidelinesCtrl', {
            $scope: scope
        });
    }));

    it('should change location to add new guideline', function () {
        scope.addGuidelineBtnClick();
        expect(location.path()).toBe('/guideline/0');
    });

    it('should change location to edit guideline', function () {
        scope.editGuidelineBtnClick(1);
        expect(location.path()).toBe('/guideline/1');
    });

    it('should call delete guideline', function () {
        var guidelineToDelete = {guidelineId: 1};
        Guideline.guidelines = [];
        Guideline.guidelines.push(guidelineToDelete);
        spyOn(Guideline, 'deleteGuideline')
        scope.deleteGuidelineBtnClick(0);
        expect(Guideline.deleteGuideline).toHaveBeenCalledWith(guidelineToDelete, 0);
    });

});
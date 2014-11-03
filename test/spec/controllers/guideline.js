'use strict';

describe('Controller: GuidelineCtrl', function () {

  // load the controller's module
  beforeEach(module('webUiApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('GuidelineCtrl', {
      $scope: scope
    });
  }));

  it('should have no items to start', function () {
    console.log(scope.guideline);
    expect(scope.guideline.guidelineId).toBe(null);
  });

});
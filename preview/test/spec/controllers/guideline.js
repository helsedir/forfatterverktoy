'use strict';

describe('Controller: GuidelineCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var GuidelineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuidelineCtrl = $controller('GuidelineCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

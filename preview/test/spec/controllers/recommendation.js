'use strict';

describe('Controller: RecommendationCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var RecommendationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecommendationCtrl = $controller('RecommendationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: PrintctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var PrintctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrintctrlCtrl = $controller('PrintctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

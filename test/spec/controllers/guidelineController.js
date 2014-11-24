'use strict';

describe('Controller: GuidelineCtrl', function () {

  // load the controller's module
  beforeEach(module('webUiApp'));

  var GuidelineController;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuidelineController = $controller('GuidelineCtrl', {
      $scope: scope
    });
  }));




});
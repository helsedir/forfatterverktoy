'use strict';

describe('Directive: previewButton', function () {

  // load the directive's module
  beforeEach(module('webUiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<preview-button></preview-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the previewButton directive');
  }));
});
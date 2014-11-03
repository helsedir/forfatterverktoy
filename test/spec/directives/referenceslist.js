'use strict';

describe('Directive: referencesList', function () {

  // load the directive's module
  beforeEach(module('webUiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<references-list></references-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the referencesList directive');
  }));
});

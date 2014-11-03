'use strict';

describe('Directive: editSortOrder', function () {

  // load the directive's module
  beforeEach(module('webUiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-sort-order></edit-sort-order>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the editSortOrder directive');
  }));
});

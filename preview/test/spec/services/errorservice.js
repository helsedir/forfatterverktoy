'use strict';

describe('Service: ErrorService', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var ErrorService;
  beforeEach(inject(function (_ErrorService_) {
    ErrorService = _ErrorService_;
  }));

  it('should do something', function () {
    expect(!!ErrorService).toBe(true);
  });

});

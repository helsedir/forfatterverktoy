'use strict';

/**
 * @ngdoc service
 * @name webUiApp.Guideline
 * @description
 * # Guideline
 * Factory in the webUiApp.
 */
 var apiUrl = 'http://localhost:50500/';
angular.module('webUiApp')
  .factory('Guideline', ['$resource', function ($resource) {
    return $resource(apiUrl+'api/v1/guidelines/:_id',{},
    {
    	'update' : { method:'PUT' }
    });
  }])
  .factory('Section', ['$resource', function ($resource) {
    return $resource(apiUrl+'api/v1/sections/:_id',{},
    {
    	'update' : { method:'PUT' }
    });
  }])  
  .factory('Recommendation', ['$resource', function ($resource) {
    return $resource(apiUrl+'api/v1/recommendations/:_id',{},
    {
      'update' : { method:'PUT' }
    });
  }])  
  .factory('Pico', ['$resource', function ($resource) {
    return $resource(apiUrl+'api/v1/picos/:_id',{},
    {
      'update' : { method:'PUT' }
    });
  }])
  .factory('PicoCode', ['$resource', function ($resource) {
    return $resource(apiUrl+'api/v1/picoCodes/:_id',{},
    {
      'update' : { method:'PUT' }
    });
  }])
  .factory('TaxonomyCode', ['$resource', function ($resource) {
    return $resource(apiUrl+'api/v1/taxonomyCode/:_id',{},
    {
      'update' : { method:'PUT' }
    });
  }]);
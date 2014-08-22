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
  }]);
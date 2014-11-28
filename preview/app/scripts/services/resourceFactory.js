'use strict';

/**
 * @ngdoc service
 * @name webUiApp.Guideline
 * @description
 * # Guideline
 * Factory in the webUiApp.
 */
var apiUrl = 'http://localhost:50500/api/v1/';
angular.module('guidelinePreviewApp')
    .factory('Guideline', ['$resource', function ($resource) {
        return $resource(apiUrl + 'guidelines/:_id', {},
            {
                update: { method: 'PUT' },
                addSection: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'guidelines/:id/sections/'},
                addAuthor: {method: 'PUT', params: {id: '@id', authorId: '@authorId'}, url: apiUrl + 'guidelines/:id/authors/:authorId'},
                deleteAuthor: {method: 'DELETE', params: {id: '@id', authorId: '@authorId'}, url: apiUrl + 'guidelines/:id/authors/:authorId'}
            });
    }])
    .factory('Section', ['$resource', function ($resource) {
        return $resource(apiUrl + 'sections/:_id', {},
            {
                update: { method: 'PUT' },
                addSection: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'sections/:id/sections/'},
                addRecommendation: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'sections/:id/recommendations/'}
            });
    }])
    .factory('Recommendation', ['$resource', function ($resource) {
        return $resource(apiUrl + 'recommendations/:_id', {},
            {
                update: { method: 'PUT' },
                addPico: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'recommendations/:id/picos/'},
                addEmrInfo: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'recommendations/:id/emrinfos/'},
                addKeyInfo: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'recommendations/:id/keyinfo/'},
                addReference: {method: 'PUT', params: {id: '@id', referenceId: '@referenceId'}, url: apiUrl + 'recommendations/:id/references/:referenceId'},
                deleteReference: {method: 'DELETE', params: {id: '@id', referenceId: '@referenceId'}, url: apiUrl + 'recommendations/:id/references/:referenceId'}
            });
    }])
    .factory('Author', ['$resource', function ($resource) {
        return $resource(apiUrl + 'authors/:_id', {},
            {
                update: {method: 'PUT'}
            });
    }])
    .factory('Pico', ['$resource', function ($resource) {
        return $resource(apiUrl + 'picos/:_id', {},
            {
                update: { method: 'PUT' },
                addPicoCode: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picos/:id/picocodes/'},
                addPicoContinousOutcome: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picos/:id/picocontinousoutcomes/'},
                addPicoOutcome: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picos/:id/picooutcomes/'}
            });
    }])
    .factory('PicoCode', ['$resource', function ($resource) {
        return $resource(apiUrl + 'picoCodes/:_id', {},
            {
                update: { method: 'PUT' },
                addTaxonomyCode: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picoCodes/:id/taxonomyCode/'}
            });
    }])
    .factory('TaxonomyCode', ['$resource', function ($resource) {
        return $resource(apiUrl + 'taxonomycodes/:_id', {},
            {
                update: { method: 'PUT' }
            });
    }])
    .factory('EmrInfo', ['$resource', function ($resource) {
        return $resource(apiUrl + 'emrinfos/:_id', {},
            {
                update: { method: 'PUT' }
            });
    }])
    .factory('KeyInfo', ['$resource', function ($resource) {
        return $resource(apiUrl + 'keyinfos/:_id', {},
            {
                update: { method: 'PUT' }
            });
    }])
    .factory('PicoContinousOutcome', ['$resource', function ($resource) {
        return $resource(apiUrl + 'picocontinousoutcomes/:_id', {},
            {
                update: { method: 'PUT' }
            });
    }])
    .factory('PicoOutcome', ['$resource', function ($resource) {
        return $resource(apiUrl + 'picooutcomes/:_id', {},
            {
                update: { method: 'PUT' }
            });
    }])
    .factory('Reference', ['$resource', function ($resource) {
        return $resource(apiUrl + 'referances/:_id', {},
            {
                update: { method: 'PUT' }
            });
    }])
;

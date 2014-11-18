'use strict';

/**
 * @ngdoc service
 * @name webUiApp.Guideline
 * @description
 * # Guideline
 * Factory in the webUiApp.
 */
var apiUrl = 'http://localhost:50500/api/v1/';
angular.module('webUiApp')
    .factory('Guideline', ['$resource', 'toastr', 'Crud', function ($resource, toastr, Crud) {
        var service = {};
        service.guidelines = [];

        var resource = $resource(apiUrl + 'guidelines/:_id', {},
            {
                update: { method: 'PUT' },
                addSection: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'guidelines/:id/sections/'},
                addAuthor: {method: 'PUT', params: {id: '@id', authorId: '@authorId'}, url: apiUrl + 'guidelines/:id/authors/:authorId'},
                deleteAuthor: {method: 'DELETE', params: {id: '@id', authorId: '@authorId'}, url: apiUrl + 'guidelines/:id/authors/:authorId'}
            });

        service.getGuidelines = function () {
            return resource.query().
                $promise.then(function (guidelines) {
                    service.guidelines = guidelines;
            }, function(error){
                Crud.handlePostError(error);
            });
        };

        service.deleteGuideline = function (guidelineToDelete, index) {
            return resource.delete({_id: guidelineToDelete.guidelineId})
                .$promise.then(function () {
                    toastr.success(guidelineToDelete.heading, 'Slettet');
                    service.guidelines.splice(index, 1);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.getGuideline = function (guidelineID) {
            return resource.get({_id: guidelineID}).
                $promise.then(function(data) {
                service.guideline = data;
                //$location.path(baseUrl + data.sectionId);
            }, function (error){
                Crud.handlePostError(error);
            });
        };

        service.addSection = function (guidelineId, sectionToAdd) {
            return resource.addSection({id: guidelineId}, sectionToAdd)
                .$promise.then(function(data) {
                    toastr.success(data.heading, 'Opprettet seksjon');
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;

    }])
    .factory('Section', ['$resource', 'toastr', 'Crud', function ($resource, toastr, Crud) {
        var resource = {};

        var section = $resource(apiUrl + 'sections/:_id', {},
            {
                update: { method: 'PUT' },
                addSection: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'sections/:id/sections/'},
                addRecommendation: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'sections/:id/recommendations/'}
            });

        resource.deleteSection = function (sectionToDelete) {
            return section.delete({_id: sectionToDelete.sectionId})
                .$promise.then(function () {
                    toastr.success(sectionToDelete.heading, 'Slettet');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        resource.getSection = function (sectionId) {
            return section.get({_id: sectionId});
        };

        resource.addSection = function (parentSectionId, sectionToAdd) {
            return section.addSection({id: parentSectionId}, sectionToAdd)
                .$promise.then(function(data) {
                    toastr.success(data.heading, 'Opprettet seksjon');
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return resource;
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
                addPicoOutcome: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picos/:id/picooutcomes/'}
            });
    }])
    .factory('PicoCode', ['$resource', function ($resource) {
        return $resource(apiUrl + 'picoCodes/:_id', {},
            {
                update: { method: 'PUT' },
                addTaxonomyCode: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picoCodes/:id/taxonomyCodes/'}
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
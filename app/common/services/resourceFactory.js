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
    .factory('Guideline', ['$resource', 'toastr', 'Crud', 'Section', function ($resource, toastr, Crud, Section) {
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

        service.saveGuideline = function (guideline) {
            return resource.save(guideline)
                .$promise.then(function (data) {
                    //update the object
                    service.guideline = data;
                    toastr.success(data.heading, 'Lagret');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.updateGuideline = function (guidelineToUpdate) {
            return resource.update({_id: guidelineToUpdate.guidelineId}, guidelineToUpdate)
                .$promise.then(function () {
                    toastr.success(guidelineToUpdate.title, 'Lagret');
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
                    toastr.success(data.heading, 'La til seksjon i retningslinje');
                    return data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteSection = function (sectionToDelete, index) {
            Section.deleteSection(sectionToDelete).then(function () {
               service.guideline.sections.splice(index, 1);
            });
        };

        service.addAuthor = function (author) {
            return resource.addAuthor({id: service.guideline.guidelineId, authorId: author.authorId})
                .$promise.then(function(){
                    toastr.success(author.name, 'La til forfatter i retningslinje');
                    service.guideline.authors.push(author);
                },
                function(error){
                    Crud.handlePostError(error);
                });
        };

        service.removeAuthor = function (author) {
            return resource.deleteAuthor({id: service.guideline.guidelineId, authorId: author.authorId})
                .$promise.then(function(){
                    toastr.success(author.name,'Fjernet forfatter fra retningslinjen');
                    //Remove author from list
                    for (var i = service.guideline.authors.length - 1; i >= 0; i--) {
                        if(service.guideline.authors[i].authorId == author.authorId){
                            service.guideline.authors.splice(i, 1);
                        }
                    }
                },
                function(error){
                    Crud.handlePostError(error);
                });
        };

        service.isAuthorInGuideline = function (author) {
            var authorInGuideline = false;
            service.guideline.authors.forEach(function (element) {
               if (element.authorId == author.authorId) {
                   authorInGuideline = true;
               }
            });
            return authorInGuideline;
        };

        return service;

    }])
    .factory('Section', ['$resource', 'toastr', 'Crud', 'Recommendation', function ($resource, toastr, Crud, Recommendation) {
        var service = {};
        service.section = {};

        var resource = $resource(apiUrl + 'sections/:_id', {},
            {
                update: { method: 'PUT' },
                addSection: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'sections/:id/sections/'},
                addRecommendation: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'sections/:id/recommendations/'}
            });

        service.createSection = function (section) {
            return resource.save(section)
                .$promise.then(function (data) {
                    //update the object
                    service.section = data;
                    toastr.success(data.heading, 'Lagret');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteSection = function (sectionToDelete, index) {
            return resource.delete({_id: sectionToDelete.sectionId})
                .$promise.then(function () {
                    toastr.success(sectionToDelete.heading, 'Slettet');
                    if (typeof(index) !== 'undefined') {
                        service.section.childSections.splice(index, 1);
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.updateSection = function (sectionToUpdate) {
            return resource.update({_id: sectionToUpdate.sectionId}, sectionToUpdate)
                .$promise.then(function () {
                    toastr.success(sectionToUpdate.heading, 'Lagret');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.getSection = function (sectionId) {
            return resource.get({_id: sectionId}).
                $promise.then(function(data) {
                    service.section = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.addSection = function (parentSectionId, sectionToAdd) {
            return resource.addSection({id: parentSectionId}, sectionToAdd)
                .$promise.then(function(data) {
                    toastr.success(data.heading, 'La til underseksjon');
                    service.section = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.addRecommendation = function (sectionId, recommendation) {
            return resource.addRecommendation({id: sectionId}, recommendation)
                .$promise.then(function(data) {
                    toastr.success(data.heading, 'La til anbefaling');
                    return data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteRecommendation = function (recommendationToDelete, index) {
            Recommendation.deleteRecommendation(recommendationToDelete).then(function () {
                service.section.recommendations.splice(index, 1);
            });
        };

        return service;
    }])
    .factory('Recommendation', ['$resource', 'toastr', 'Crud', function ($resource, toastr, Crud) {
        var service = {};
        service.recommendation = {};

        var resource = $resource(apiUrl + 'recommendations/:_id', {},
            {
                update: { method: 'PUT' },
                addPico: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'recommendations/:id/picos/'},
                addEmrInfo: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'recommendations/:id/emrinfos/'},
                addKeyInfo: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'recommendations/:id/keyinfo/'},
                addReference: {method: 'PUT', params: {id: '@id', referenceId: '@referenceId'}, url: apiUrl + 'recommendations/:id/references/:referenceId'},
                deleteReference: {method: 'DELETE', params: {id: '@id', referenceId: '@referenceId'}, url: apiUrl + 'recommendations/:id/references/:referenceId'}
            });


        service.updateRecommendation = function (recommendationToUpdate) {
            return resource.update({_id: recommendationToUpdate.recommendationId}, recommendationToUpdate)
                .$promise.then(function () {
                    toastr.success(recommendationToUpdate.heading, 'Lagret');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.getRecommendation = function (recommendationId) {
            return resource.get({_id: recommendationId}).
                $promise.then(function(data) {
                    service.recommendation = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteRecommendation = function (recommendationToDelete) {
            return resource.delete({_id: recommendationToDelete.recommendationId})
                .$promise.then(function () {
                    toastr.success(recommendationToDelete.heading, 'Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(recommendationToDelete.recommendationId ===  service.recommendation.recommendationId){
                        service.recommendation = {};
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deletePico = function (index, picoToDelete) {
            Pico.deletePico(picoToDelete).then(function (){
                service.recommendation.picos.splice(index, 1);
            });
        };

        return service;
    }])
    .factory('Author', ['$resource', 'toastr', 'Crud', function ($resource, toastr, Crud) {
        var service = {};
        service.authors = [];

        var resource =  $resource(apiUrl + 'authors/:_id', {},
            {
                update: {method: 'PUT'}
            });

        service.getAuthors = function () {
            return resource.query().
                $promise.then(function (authors) {
                    service.authors = authors;
                }, function(error){
                    Crud.handlePostError(error);
                });
        };

        service.createAuthor = function (author) {
            return resource.save(author)
                .$promise.then(function (data) {
                    //update the object
                    service.author = data;
                    toastr.success(data.name, 'Opprettet forfatter');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;
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
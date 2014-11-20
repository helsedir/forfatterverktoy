'use strict';

/**
 * @ngdoc service
 * @name webUiApp.Guideline
 * @description
 * # Guideline
 * Factory in the webUiApp.
 */
angular.module('webUiApp')
    .factory('Guideline', ['$resource', 'apiUrl', 'toastr', 'Crud', 'Section', 'apiUrl', function ($resource, apiUrl, toastr, Crud, Section) {
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
    .factory('Section', ['$resource', 'apiUrl', 'toastr', 'Crud', 'Recommendation', function ($resource, apiUrl, toastr, Crud, Recommendation) {
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
    .factory('Recommendation', ['$resource', 'apiUrl', 'toastr', 'Crud', 'Pico', 'EmrInfo', 'KeyInfo',
        function ($resource, apiUrl, toastr, Crud, Pico, EmrInfo, KeyInfo) {
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

        service.addPico = function (recommendationId, pico) {
            return resource.addPico({id: recommendationId}, pico)
                .$promise.then(function(data) {
                    toastr.success('La til pico');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deletePico = function (index, picoToDelete) {
            Pico.deletePico(picoToDelete).then(function (){
                service.recommendation.picos.splice(index, 1);
            });
        };


        service.addEmrInfo = function (recommendationId, emrInfo) {
            return resource.addEmrInfo({id: recommendationId}, emrInfo)
                .$promise.then(function (data) {
                    toastr.success('La til emrInfo');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteEmrInfo = function (index, emrInfoToDelete) {
            EmrInfo.deleteEmrInfo(emrInfoToDelete).then(function (){
                service.recommendation.emrInfos.splice(index, 1);
            });
        };


        service.addKeyInfo = function (recommendationId, keyInfo) {
            return resource.addKeyInfo({id: recommendationId}, keyInfo)
                .$promise.then(function (data) {
                    toastr.success('La til keyInfo');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteKeyInfo = function (index, keyInfoToDelete) {
            KeyInfo.deleteKeyInfo(keyInfoToDelete).then(function (){
                service.recommendation.keyInfos.splice(index, 1);
            });
        };

            service.addReference = function (reference) {
                return resource.addReference({id: service.recommendation.recommendationId, referenceId: reference.referenceId})
                    .$promise.then(function(){
                        toastr.success('La til referanse i anbefaling');
                        service.recommendation.references.push(reference);
                    },
                    function(error){
                        Crud.handlePostError(error);
                    });
            };

            service.removeReference = function (referenceId) {
                return resource.deleteReference({id: service.recommendation.recommendationId, referenceId: referenceId})
                    .$promise.then(function(){
                        toastr.success('Fjernet referanse fra anbefalingen');
                        //Remove reference from list
                        for (var i = service.recommendation.references.length - 1; i >= 0; i--) {
                            if(service.recommendation.references[i].referenceId == referenceId){
                                service.recommendation.references.splice(i, 1);
                            }
                        }
                    },
                    function(error){
                        Crud.handlePostError(error);
                    });
            };



        return service;
    }])
    .factory('Author', ['$resource', 'apiUrl', 'toastr', 'Crud', function ($resource, apiUrl, toastr, Crud) {
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
    .factory('Pico', ['$resource', 'apiUrl', 'toastr', 'Crud', 'PicoCode', 'PicoOutcome', function ($resource, apiUrl, toastr, Crud, PicoCode, PicoOutcome) {
        var service = {};

        var resource =  $resource(apiUrl + 'picos/:_id', {},
            {
                update: { method: 'PUT' },
                addPicoCode: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picos/:id/picocodes/'},
                addPicoOutcome: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picos/:id/picooutcomes/'}
            });

        service.getPico = function (picoId) {
            return resource.get({_id: picoId}).
                $promise.then(function(data) {
                    service.pico = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.updatePico = function (pico) {
            return resource.update({_id: pico.picoId}, pico)
                .$promise.then(function () {
                    toastr.success('Lagret');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deletePico = function (picoToDelete) {
            return resource.delete({_id: picoToDelete.picoId})
                .$promise.then(function () {
                    toastr.success('Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(picoToDelete.picoId ===  service.pico.picoId){
                        service.pico = {};
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.addPicoCode = function (picoId, picoCode) {
            return resource.addPicoCode({id: picoId}, picoCode)
                .$promise.then(function(data) {
                    toastr.success('La til pico kode');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deletePicoCode = function (index) {
            var picoCode = service.pico.picoCodes[index];
            PicoCode.deletePicoCode(picoCode).then(function (){
                service.pico.picoCodes.splice(index, 1);
            });
        };

        service.addPicoOutcome = function (picoId, picoOutcome) {
            return resource.addPicoOutcome({id: picoId}, picoOutcome)
                .$promise.then(function(data) {
                    toastr.success('La til pico outcome');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deletePicoOutcome = function (index) {
            var picoOutcome = service.pico.picoOutcomes[index];
            PicoOutcome.deletePicoOutcome(picoOutcome).then(function (){
                service.pico.picoOutcomes.splice(index, 1);
            });
        };


        return service;
    }])
    .factory('PicoCode', ['$resource', 'apiUrl', 'Crud', 'toastr', 'apiUrl', function ($resource, apiUrl, Crud, toastr) {
        var service = {};

        var resource = $resource(apiUrl + 'picoCodes/:_id', {},
            {
                update: { method: 'PUT' },
                addTaxonomyCode: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picoCodes/:id/taxonomyCodes/'}
            });

        service.deletePicoCode = function (picoCode) {
            return resource.delete({_id: picoCode.picoCodeId})
                .$promise.then(function () {
                    toastr.success('Slettet');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.addTaxonomyCode = function (picoCodeId, taxonomyCode) {
            return resource.addTaxonomyCode({id: picoCodeId}, taxonomyCode)
                .$promise.then(function(data) {
                    toastr.success('La til taksonomikode');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;
    }])
    .factory('TaxonomyCode', ['$resource', 'apiUrl', 'toastr', 'Crud', function ($resource, apiUrl, toastr, Crud) {
        var service = {};

        var resource = $resource(apiUrl + 'taxonomycodes/:_id', {},
            {
                update: { method: 'PUT' }
            });

        service.deleteTaxonomyCode = function (taxonomyCodeId) {
            return resource.delete({_id: taxonomyCodeId})
                .$promise.then(function () {
                    toastr.success('Slettet');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };
    }])
    .factory('EmrInfo', ['$resource', 'apiUrl', 'toastr', 'Crud', function ($resource, apiUrl, toastr, Crud) {
        var service = {};

        var resource = $resource(apiUrl + 'emrinfos/:_id', {},
            {
                update: { method: 'PUT' }
            });

        service.getEmrInfo = function (emrInfoId) {
            return resource.get({_id: emrInfoId}).
                $promise.then(function(data) {
                    service.emrInfo = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteEmrInfo = function (id) {
            return resource.delete({_id: id})
                .$promise.then(function () {
                    toastr.success('Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(id ===  service.emrInfo.emrInfoId){
                        service.emrInfo = {};
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };
        return service;
    }])
    .factory('KeyInfo', ['$resource', 'apiUrl', 'toastr', 'Crud', function ($resource, apiUrl, toastr, Crud) {
        var service = {};

        var resource = $resource(apiUrl + 'keyinfos/:_id', {},
            {
                update: { method: 'PUT' }
            });

        service.getKeyInfo = function (keyInfoId) {
            return resource.get({_id: keyInfoId}).
                $promise.then(function(data) {
                    service.keyInfo = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteKeyInfo = function (id) {
            return resource.delete({_id: id})
                .$promise.then(function () {
                    toastr.success('Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(id ===  service.keyInfo.keyInfoId){
                        service.keyInfo = {};
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;
    }])
    .factory('PicoOutcome', ['$resource', 'apiUrl', 'Crud', 'toastr', function ($resource, apiUrl, Crud, toastr) {
        var service = {};

        var resource = $resource(apiUrl + 'picooutcomes/:_id', {},
            {
                update: { method: 'PUT' }
            });

        service.getPicoOutcome = function (picoOutcomeId) {
            return resource.get({_id: picoOutcomeId}).
                $promise.then(function(data) {
                    service.picoOutcome = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.updatePicoOutcome = function (picoOutcome) {
            return resource.update({_id: picoOutcome.picoOutcomeId}, picoOutcome)
                .$promise.then(function () {
                    toastr.success('Lagret');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deletePicoOutcome = function (picoOutcome) {
            return resource.delete({_id: picoOutcome.picoOutcomeId})
                .$promise.then(function () {
                    toastr.success('Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(picoOutcome.picoOutcomeId ===  service.picoOutcome.picoOutcomeId){
                        service.picoOutcome = {};
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;
    }])
    .factory('Reference', ['$resource', 'apiUrl', 'Crud', 'toastr', function ($resource, apiUrl, Crud, toastr) {
        var service = {};
        service.references = [];

        var resource = $resource(apiUrl + 'referances/:_id', {},
            {
                update: { method: 'PUT' }
            });

        service.getReferences = function () {
            return resource.query().
                $promise.then(function(data) {
                    service.references = data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.getReference = function (referenceId) {
            return resource.get({_id: referenceId}).
                $promise.then(function(data) {
                    service.reference = data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.createReference = function (reference) {
            return resource.save(reference)
                .$promise.then(function (data) {
                    //update the object
                    service.reference = data;
                    service.references.push(data);
                    toastr.success('Lagret');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };


        service.deleteReference = function (reference) {
            return resource.delete({_id: reference.referenceId})
                .$promise.then(function () {
                    toastr.success('Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(reference.referenceId ===  service.reference.referenceId){
                        service.reference = {};
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;
    }])
;
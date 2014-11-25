'use strict';

angular.module('webUiApp')
.factory('Guideline', ['$resource', 'apiUrl', 'NotificationFactory', 'Section', 'apiUrl', function ($resource, apiUrl, NotificationFactory, Section) {
    var service = {};
    service.guidelines = [];

    var resource = $resource(apiUrl + 'guidelines/:_id', {},
        {
            update: { method: 'PUT' },
            addSection: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'guidelines/:id/sections/'},
            addAuthor: {method: 'PUT', params: {id: '@id', authorId: '@authorId'}, url: apiUrl + 'guidelines/:id/authors/:authorId'},
            deleteAuthor: {method: 'DELETE', params: {id: '@id', authorId: '@authorId'}, url: apiUrl + 'guidelines/:id/authors/:authorId'},
            publish: {method: 'PUT', params: {id: '@id', publishedStage:'@publishedStage'}, url: apiUrl + 'guidelines/:id/publish?publishedStage=:publishedStage'}
        });

    service.getGuidelines = function () {
        return resource.query().
            $promise.then(function (guidelines) {
                service.guidelines = guidelines;
            }, function(error){
                NotificationFactory.handlePostError(error);
            });
    };

    service.deleteGuideline = function (id, index) {
        return resource.delete({_id: id})
            .$promise.then(function () {
                NotificationFactory.displaySuccess('Slettet');
                if (service.guideline.guidelineId == id) {
                    service.guideline = {};
                }
                if(typeof(index != 'undefined')) {
                    service.guidelines.splice(index, 1);
                }
            }, function (error){
                NotificationFactory.handlePostError(error);
            });
    };

    service.saveGuideline = function (guideline) {
        return resource.save(guideline)
            .$promise.then(function (data) {
                //update the object
                service.guideline = data;
                NotificationFactory.displaySuccess('Lagret', data.heading);
            }, function (error){
                NotificationFactory.handlePostError(error);
            });
    };

    service.updateGuideline = function (guidelineToUpdate) {
        return resource.update({_id: guidelineToUpdate.guidelineId}, guidelineToUpdate)
            .$promise.then(function (data) {
                NotificationFactory.displaySuccess('Lagret', guidelineToUpdate.title);
                service.guideline = data;
            }, function (error){
                NotificationFactory.handlePostError(error);
            });
    };

    service.getGuideline = function (guidelineID) {
        return resource.get({_id: guidelineID}).
            $promise.then(function(data) {
                service.guideline = data;
            }, function (error){
                NotificationFactory.handlePostError(error);
            });
    };

    service.addSection = function (guidelineId, sectionToAdd) {
        return resource.addSection({id: guidelineId}, sectionToAdd)
            .$promise.then(function(data) {
                NotificationFactory.displaySuccess('La til seksjon i retningslinje', data.heading);
                service.guideline.sections.push(data);
                return data;
            }, function (error){
                NotificationFactory.handlePostError(error);
            });
    };

    service.deleteSection = function (sectionToDelete, index) {
        return Section.deleteSection(sectionToDelete).then(function () {
            service.guideline.sections.splice(index, 1);
        });
    };

    service.addAuthor = function (author) {
        console.log(author.authorId);
        return resource.addAuthor({id: service.guideline.guidelineId, authorId: author.authorId})
            .$promise.then(function(){
                NotificationFactory.displaySuccess('La til forfatter i retningslinje', author.name);
                service.guideline.authors.push(author);
            },
            function(error){
                NotificationFactory.handlePostError(error);
            });
    };

    service.removeAuthor = function (author) {
        return resource.deleteAuthor({id: service.guideline.guidelineId, authorId: author.authorId})
            .$promise.then(function(){
                NotificationFactory.displaySuccess('Fjernet forfatter fra retningslinjen', author.name);
                //Remove author from list
                for (var i = service.guideline.authors.length - 1; i >= 0; i--) {
                    if(service.guideline.authors[i].authorId == author.authorId){
                        service.guideline.authors.splice(i, 1);
                    }
                }
            },
            function(error){
                NotificationFactory.handlePostError(error);
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

        service.publish = function (guidelineId, publishedStage) {
            return resource.publish({id: guidelineId, publishedStage: publishedStage}).
                $promise.then(function () {
                    NotificationFactory.displaySuccess('Oppdaterte publiseringsstatus');
                },
                function (error) {
                    NotificationFactory.handlePostError(error);
                });
        };

    return service;

}]);
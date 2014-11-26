angular.module('webUiApp')
    .factory('Section', ['$resource', 'apiUrl', 'NotificationFactory', 'Recommendation', function ($resource, apiUrl, NotificationFactory, Recommendation) {
        var service = {};
        service.section = {};
        service.section.recommendations = [];

        var resource = $resource(apiUrl + 'sections/:_id', {},
            {
                update: { method: 'PUT' },
                addSection: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'sections/:id/sections/'},
                addRecommendation: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'sections/:id/recommendations/'},
                publish: {method: 'PUT', params: {id: '@id', publishedStage:'@publishedStage'}, url: apiUrl + 'sections/:id/publish?publishedStage=:publishedStage'}
            });

        service.getSection = function (sectionId) {
            return resource.get({_id: sectionId}).
                $promise.then(function(data) {
                    service.section = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    NotificationFactory.handlePostError(error);
                });
        };

        service.createSection = function (section) {
            return resource.save(section)
                .$promise.then(function (data) {
                    //update the object
                    service.section = data;
                    NotificationFactory.displaySuccess('Lagret', data.heading);
                }, function (error){
                    NotificationFactory.handlePostError(error);
                });
        };

        service.deleteSection = function (sectionToDelete, index) {
            return resource.delete({_id: sectionToDelete.sectionId})
                .$promise.then(function () {
                    NotificationFactory.displaySuccess('Slettet', sectionToDelete.heading);
                    //If we deleted the section object we are using
                    if (sectionToDelete.sectionId == service.section.sectionId) {
                        service.section = {};
                    }
                    //If it was a childsection
                    if (typeof(index) !== 'undefined') {
                        service.section.childSections.splice(index, 1);
                    }
                }, function (error){
                    NotificationFactory.handlePostError(error);
                });
        };

        service.updateSection = function (sectionToUpdate) {
            return resource.update({_id: sectionToUpdate.sectionId}, sectionToUpdate)
                .$promise.then(function (data) {
                    service.section = data;
                    NotificationFactory.displaySuccess('Lagret', sectionToUpdate.heading);
                }, function (error){
                    NotificationFactory.handlePostError(error);
                });
        };

        service.addSection = function (parentSectionId, sectionToAdd) {
            return resource.addSection({id: parentSectionId}, sectionToAdd)
                .$promise.then(function(data) {
                    NotificationFactory.displaySuccess('La til underseksjon', data.heading);
                    service.section = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    NotificationFactory.handlePostError(error);
                });
        };

        service.addRecommendation = function (sectionId, recommendation) {
            return resource.addRecommendation({id: sectionId}, recommendation)
                .$promise.then(function(data) {
                    NotificationFactory.displaySuccess('La til anbefaling', data.heading);
                    service.section.recommendations.push(data);
                    return data;
                }, function (error){
                    NotificationFactory.handlePostError(error);
                });
        };

        service.deleteRecommendation = function (recommendationToDelete, index) {
            return Recommendation.deleteRecommendation(recommendationToDelete).then(function () {
                service.section.recommendations.splice(index, 1);
            });
        };

        service.publish = function (sectionId, publishedStage) {
            return resource.publish({id: sectionId, publishedStage: publishedStage}).
                $promise.then(function () {
                },
                function (error) {
                    NotificationFactory.handlePostError(error);
                });
        };

        return service;
    }]);
angular.module('webUiApp')
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
    }]);
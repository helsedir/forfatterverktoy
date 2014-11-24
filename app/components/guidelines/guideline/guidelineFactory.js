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

    service.deleteGuideline = function (id, index) {
        return resource.delete({_id: id})
            .$promise.then(function () {
                toastr.success('Slettet');
                if (service.guideline.guidelineId == id) {
                    service.guideline = {};
                }
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
            .$promise.then(function (data) {
                toastr.success(guidelineToUpdate.title, 'Lagret');
                service.guideline = data;
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
                service.guideline.sections.push(data);
                return data;
                //$location.path(baseUrl + data.sectionId);
            }, function (error){
                Crud.handlePostError(error);
            });
    };

    service.deleteSection = function (sectionToDelete, index) {
        return Section.deleteSection(sectionToDelete).then(function () {
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

}]);
angular.module('webUiApp')
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

        service.getAuthor = function (authorId) {
            return resource.get({_id: authorId}).
                $promise.then(function(data) {
                    service.author = data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.createAuthor = function (author) {
            return resource.save(author)
                .$promise.then(function (data) {
                    //update the object
                    service.author = data;
                    service.authors.push(data);
                    toastr.success(data.name, 'Opprettet forfatter');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.updateAuthor = function (author) {
            return resource.update({_id: service.author.authorId}, author)
                .$promise.then(function (data) {
                    toastr.success('Lagret');
                    for(var i = 0; i < service.authors.length; i++) {
                        if (service.authors[i].authorId == data.authorId) {
                            service.authors[i] = data;
                        }
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteAuthor = function (author) {
            return resource.delete({_id: author.authorId})
                .$promise.then(function () {

                    toastr.success('Slettet');
                    service.authors.splice(service.authors.indexOf(author),1);

                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;
    }]);
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
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.updateAuthor = function (author,index) {
            return resource.update({_id: service.author.authorId}, author)
                .$promise.then(function (data) {
                    toastr.success('Lagret');
                    if (typeof(index) != 'undefined') {
                        service.authors[index] = data;
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteAuthor = function (id, index) {
            return resource.delete({_id: id})
                .$promise.then(function () {
                    toastr.success('Slettet');

                    if (typeof(index) != 'undefined') {
                        service.authors.splice(index,1);
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;
    }]);
angular.module('webUiApp')
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

        service.updateReference = function (reference,index) {
            return resource.update({_id: reference.referenceId}, reference)
                .$promise.then(function (data) {
                    toastr.success('Lagret');
                    if (typeof(index) != 'undefined') {
                        service.references[index] = data;
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };


        service.deleteReference = function (referenceId, index) {
            return resource.delete({_id: referenceId})
                .$promise.then(function () {
                    toastr.success('Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(typeof(service.reference) != 'undefined' && referenceId ===  service.reference.referenceId){
                        service.reference = {};
                    }
                    if(typeof(index) != 'undefined') {
                        service.references.splice(index, 1);
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;
    }]);
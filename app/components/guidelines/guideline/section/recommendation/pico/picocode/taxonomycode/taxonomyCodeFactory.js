angular.module('webUiApp')
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
    }]);
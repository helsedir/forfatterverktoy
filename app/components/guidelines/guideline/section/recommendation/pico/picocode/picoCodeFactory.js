angular.module('webUiApp')
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
    }]);
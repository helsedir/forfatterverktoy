'use strict';
angular.module('webUiApp')
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
    }]);
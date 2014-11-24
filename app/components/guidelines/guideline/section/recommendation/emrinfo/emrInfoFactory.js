'use strict';
angular.module('webUiApp')
    .factory('EmrInfo', ['$resource', 'apiUrl', 'toastr', 'Crud', function ($resource, apiUrl, toastr, Crud) {
        var service = {};

        var resource = $resource(apiUrl + 'emrinfos/:_id', {},
            {
                update: { method: 'PUT' }
            });

        service.getEmrInfo = function (emrInfoId) {
            return resource.get({_id: emrInfoId}).
                $promise.then(function(data) {
                    service.emrInfo = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteEmrInfo = function (id) {
            return resource.delete({_id: id})
                .$promise.then(function () {
                    toastr.success('Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(id ===  service.emrInfo.emrInfoId){
                        service.emrInfo = {};
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };
        return service;
    }]);
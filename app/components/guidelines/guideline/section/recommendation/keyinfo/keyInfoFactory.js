'use strict';
angular.module('webUiApp')
    .factory('KeyInfo', ['$resource', 'apiUrl', 'toastr', 'Crud', function ($resource, apiUrl, toastr, Crud) {
        var service = {};

        var resource = $resource(apiUrl + 'keyinfos/:_id', {},
            {
                update: { method: 'PUT' }
            });

        service.getKeyInfo = function (keyInfoId) {
            return resource.get({_id: keyInfoId}).
                $promise.then(function(data) {
                    service.keyInfo = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deleteKeyInfo = function (keyInfoId) {
            return resource.delete({_id: keyInfoId})
                .$promise.then(function () {
                    toastr.success('Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(typeof(service.keyInfo.keyInfoId != 'undefined') && keyInfoId ===  service.keyInfo.keyInfoId){
                        service.keyInfo = {};
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        return service;
    }]);
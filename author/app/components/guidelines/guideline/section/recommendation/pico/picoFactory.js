angular.module('webUiApp')
    .factory('Pico', ['$resource', 'apiUrl', 'toastr', 'Crud', 'PicoCode', 'PicoOutcome', function ($resource, apiUrl, toastr, Crud, PicoCode, PicoOutcome) {
        var service = {};

        var resource =  $resource(apiUrl + 'picos/:_id', {},
            {
                update: { method: 'PUT' },
                addPicoCode: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picos/:id/picocodes/'},
                addPicoOutcome: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'picos/:id/picooutcomes/'}
            });

        service.getPico = function (picoId) {
            return resource.get({_id: picoId}).
                $promise.then(function(data) {
                    service.pico = data;
                    //$location.path(baseUrl + data.sectionId);
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.updatePico = function (pico) {
            return resource.update({_id: pico.picoId}, pico)
                .$promise.then(function () {
                    toastr.success('Lagret');
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deletePico = function (picoToDelete) {
            return resource.delete({_id: picoToDelete.picoId})
                .$promise.then(function () {
                    toastr.success('Slettet');
                    //If the recommendation we deleted was the same as the one we're keeping the state of
                    if(typeof(service.pico) != 'undefined' && picoToDelete.picoId ===  service.pico.picoId){
                        service.pico = {};
                    }
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.addPicoCode = function (picoId, picoCode) {
            return resource.addPicoCode({id: picoId}, picoCode)
                .$promise.then(function(data) {
                    toastr.success('La til pico kode');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deletePicoCode = function (index) {
            var picoCode = service.pico.picoCodes[index];
            PicoCode.deletePicoCode(picoCode).then(function (){
                service.pico.picoCodes.splice(index, 1);
            });
        };

        service.addPicoOutcome = function (picoId, picoOutcome) {
            return resource.addPicoOutcome({id: picoId}, picoOutcome)
                .$promise.then(function(data) {
                    toastr.success('La til pico outcome');
                    return data;
                }, function (error){
                    Crud.handlePostError(error);
                });
        };

        service.deletePicoOutcome = function (index) {
            var picoOutcome = service.pico.picoOutcomes[index];
            PicoOutcome.deletePicoOutcome(picoOutcome).then(function (){
                service.pico.picoOutcomes.splice(index, 1);
            });
        };


        return service;
    }]);
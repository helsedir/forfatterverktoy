angular.module('webUiApp')
    .factory('Recommendation', ['$resource', 'apiUrl', 'toastr', 'Crud', 'Pico', 'EmrInfo', 'KeyInfo',
        function ($resource, apiUrl, toastr, Crud, Pico, EmrInfo, KeyInfo) {
            var service = {};
            service.recommendation = {};

            var resource = $resource(apiUrl + 'recommendations/:_id', {},
                {
                    update: { method: 'PUT' },
                    addPico: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'recommendations/:id/picos/'},
                    addEmrInfo: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'recommendations/:id/emrinfos/'},
                    addKeyInfo: {method: 'POST', params: {id: '@id'}, url: apiUrl + 'recommendations/:id/keyinfo/'},
                    addReference: {method: 'PUT', params: {id: '@id', referenceId: '@referenceId'}, url: apiUrl + 'recommendations/:id/references/:referenceId'},
                    deleteReference: {method: 'DELETE', params: {id: '@id', referenceId: '@referenceId'}, url: apiUrl + 'recommendations/:id/references/:referenceId'},
                    publish: {method: 'PUT', params: {id: '@id', publishedStage:'@publishedStage'}, url: apiUrl + 'recommendations/:id/publish?publishedStage=:publishedStage'}
                });


            service.updateRecommendation = function (recommendationToUpdate) {
                return resource.update({_id: recommendationToUpdate.recommendationId}, recommendationToUpdate)
                    .$promise.then(function () {
                        toastr.success(recommendationToUpdate.heading, 'Lagret');
                    }, function (error){
                        Crud.handlePostError(error);
                    });
            };

            service.getRecommendation = function (recommendationId) {
                return resource.get({_id: recommendationId}).
                    $promise.then(function(data) {
                        service.recommendation = data;
                        //$location.path(baseUrl + data.sectionId);
                    }, function (error){
                        Crud.handlePostError(error);
                    });
            };

            service.deleteRecommendation = function (recommendationToDelete) {
                return resource.delete({_id: recommendationToDelete.recommendationId})
                    .$promise.then(function () {
                        toastr.success(recommendationToDelete.heading, 'Slettet');
                        //If the recommendation we deleted was the same as the one we're keeping the state of
                        if(recommendationToDelete.recommendationId ===  service.recommendation.recommendationId){
                            service.recommendation = {};
                        }
                    }, function (error){
                        Crud.handlePostError(error);
                    });
            };

            service.addPico = function (recommendationId, pico) {
                return resource.addPico({id: recommendationId}, pico)
                    .$promise.then(function(data) {
                        toastr.success('La til pico');
                        return data;
                    }, function (error){
                        Crud.handlePostError(error);
                    });
            };

            service.deletePico = function (index, picoToDelete) {
                Pico.deletePico(picoToDelete).then(function (){
                    service.recommendation.picos.splice(index, 1);
                });
            };


            service.addEmrInfo = function (recommendationId, emrInfo) {
                return resource.addEmrInfo({id: recommendationId}, emrInfo)
                    .$promise.then(function (data) {
                        toastr.success('La til emrInfo');
                        return data;
                    }, function (error){
                        Crud.handlePostError(error);
                    });
            };

            service.deleteEmrInfo = function (index, emrInfoId) {
                EmrInfo.deleteEmrInfo(emrInfoId).then(function (){
                    service.recommendation.emrInfo.splice(index, 1);
                });
            };


            service.addKeyInfo = function (recommendationId, keyInfo) {
                return resource.addKeyInfo({id: recommendationId}, keyInfo)
                    .$promise.then(function (data) {
                        toastr.success('La til keyInfo');
                        return data;
                    }, function (error){
                        Crud.handlePostError(error);
                    });
            };

            service.deleteKeyInfo = function (index, keyInfoId) {
                KeyInfo.deleteKeyInfo(keyInfoId).then(function (){
                    service.recommendation.keyInfo.splice(index, 1);
                });
            };

            service.addReference = function (reference) {
                return resource.addReference({id: service.recommendation.recommendationId, referenceId: reference.referenceId})
                    .$promise.then(function(){
                        toastr.success('La til referanse i anbefaling');
                        service.recommendation.references.push(reference);
                    },
                    function(error){
                        Crud.handlePostError(error);
                    });
            };

            service.removeReference = function (referenceId) {
                return resource.deleteReference({id: service.recommendation.recommendationId, referenceId: referenceId})
                    .$promise.then(function(){
                        toastr.success('Fjernet referanse fra anbefalingen');
                        //Remove reference from list
                        for (var i = service.recommendation.references.length - 1; i >= 0; i--) {
                            if(service.recommendation.references[i].referenceId == referenceId){
                                service.recommendation.references.splice(i, 1);
                            }
                        }
                    },
                    function(error){
                        Crud.handlePostError(error);
                    });
            };

            service.publish = function (recommendationId, publishedStage) {
                return resource.publish({id: recommendationId, publishedStage: publishedStage}).
                    $promise.then(function () {
                        toastr.success('Oppdaterte publiseringsstatus');
                    },
                    function (error) {
                        Crud.handlePostError(error);
                    });
            };



            return service;
        }]);
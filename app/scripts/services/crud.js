'use strict';

/**
 * @ngdoc service
 * @name webUiApp.crud
 * @description
 * # crud
 * Service in the webUiApp.
 */
angular.module('webUiApp')
  .service('Crud', function crud(EmrInfo, KeyInfo, toastr, $location) {

    this.delete= function(item, location, type, id){
        eval(type).delete({ _id: eval(id) })
           .$promise.then(function(){
           toastr.success(type, 'Slettet');
           $location.path(location);
       }, function(error){
           handlePostError(error);
       });
    };

    this.handlePostError = function (error){
      if(error.status == 401) {
        toastr.warning('Logg inn for å lagre');
      }
      else {
        toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
      }
    };  
       
  });

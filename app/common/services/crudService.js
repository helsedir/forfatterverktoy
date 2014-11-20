'use strict';

/**
 * @ngdoc service
 * @name webUiApp.crud
 * @description
 * # crud
 * Service in the webUiApp.
 */
angular.module('webUiApp')
  .service('Crud', ['toastr', function crud(toastr) {

    this.handlePostError = function(error){
      handlePostError(error);
    };

    var handlePostError = function (error){
      if(error.status == 401) {
        toastr.warning('Logg inn for å lagre');
      }
      else {
        toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
      }
    };  
       
  }]);

'use strict';

/**
 * @ngdoc service
 * @name angularApp.ErrorService
 * @description
 * # ErrorService
 * Service in the angularApp.
 */
angular.module('guidelinePreviewApp')
  .service('ErrorService', ['toastr', function ErrorService(toastr) {
    
    this.handleError = function (error){
    	if(error.status == 401) {
    	  toastr.warning('Du må være logget inn for å se denne ressursen');
    	}
    	else if(error.status == 400 && error.data.message == "The item is not published yet."){
    		toastr.warning('Denne ressursen er ikke publisert enda. Du må være logget inn for å se den');
    	}
    	else {
    	  toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
    	}
    };
  }]);

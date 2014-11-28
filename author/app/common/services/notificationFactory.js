'use strict';

/**
 * @ngdoc service
 * @name webUiApp.crud
 * @description
 * # Notificationfactory
 * Service in the webUiApp.
 */
angular.module('webUiApp')
    .service('NotificationFactory', ['toastr', function (toastr) {

        this.handlePostError = function(error){
            handlePostError(error);
        };

        this.displaySuccess = function (message, resource) {
            if (typeof(resource) != 'undefined') {
                toastr.success(resource, message);
            }
            else {
                toastr.success(message);
            }
        };

        var handlePostError = function (error){
            if(error.status == 401) {
                toastr.warning('Logg inn for å lagre');
            }

            else if(error.status == 0) {
                toastr.error('Kan ikke opprette forbindelse til API');
            }

            else if(error.status == 404) {
                toastr.error('Status code: ' + error.status +' Kunne ikke finne ressurs.');
            }

            else {
                toastr.error('Status code: ' + error.status +' '+ error.statusText + ' Error data: ' + error.data.message, 'Error!');
            }
        };

    }]);

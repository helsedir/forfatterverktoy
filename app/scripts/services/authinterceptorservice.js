'use strict';

/**
 * @ngdoc service
 * @name webUiApp.authInterceptorService
 * @description
 * # authInterceptorService  
 * Factory in the webUiApp.
 */
angular.module('webUiApp')
  .factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {

            config.headers.Authorization = 'Bearer ' + authData.token;
        }
        else if ($location.path() == '/register'){
            //do nothing
        }
        else {
            $location.path('/login');
        }
        return config;
    };

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);

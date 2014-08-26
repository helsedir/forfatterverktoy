'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:logIn
 * @description
 * # logIn
 */
angular.module('webUiApp')
  .directive('logIn',['localStorageService', '$rootScope', function (localStorageService, $rootScope) {
    return {
      templateUrl: 'views/partials/_login.html',
      restrict: 'E',
      replace: 'true',
      link: function (scope, element, attrs) {
        scope.$on('$routeChangeSuccess', function(){
          scope.authData = localStorageService.get('authorizationData'); 
  	    });  
      }
    };
  }]);

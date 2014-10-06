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
            if(scope.authData)
            {
              var dateNow = new Date();
              var expiresDate = new Date(scope.authData.expires);
              if(dateNow>expiresDate)
              {
                  console.log('authorizationData has expired');
                  localStorageService.remove('authorizationData');
              }
            }
  	    });  
      }
    };
  }]);

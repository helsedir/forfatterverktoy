'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:logIn
 * @description 
 * # logIn
 */
angular.module('webUiApp')
  .directive('logIn',['localStorageService', 'authService', function (localStorageService, authService) {
    return {
      templateUrl: 'common/_login.html',
      restrict: 'E',
      replace: 'true',
      link: function (scope, element, attrs) {
        scope.$on('$stateChangeSuccess', function(){
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
        scope.logOutBtnClick = function(){
          authService.logOut();
          scope.authData = null;
        };
  	    });  
      }
    };
  }]);

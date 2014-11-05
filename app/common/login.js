'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('LoginCtrl', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
 
    $scope.loginData = {
        userName: "",
        password: ""
    };
 
    $scope.message = "";
 
    $scope.login = function () {
 
        authService.login($scope.loginData).then(function () {
 
            $location.path('/');
        },
         function (err) {
              $scope.message = err.error_description;
         });
    };

 
}]);

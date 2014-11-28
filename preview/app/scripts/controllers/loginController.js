'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webUiApp
 */
angular.module('guidelinePreviewApp')
  .controller('LoginCtrl', ['$scope', '$location', 'authService', '$rootScope', function ($scope, $location, authService, $rootScope) {
    $rootScope.login = true;

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

'use strict';

/**
 * @ngdoc function
 * @name webUiApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the webUiApp
 */
angular.module('webUiApp')
  .controller('RegisterCtrl', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {
 
    $scope.savedSuccessfully = false;
    $scope.message = '';
 
    $scope.registration = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''

    };
 
    $scope.signUp = function () {
 
        authService.saveRegistration($scope.registration).then(function () {
 
            $scope.savedSuccessfully = true;
            $scope.message = 'User has been registered successfully';
            startTimer();
 
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = 'Failed to register user due to: ' + errors.join(' ');
         });
    };
 
    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    };
 
}]);
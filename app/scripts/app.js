'use strict';

/**
 * @ngdoc overview
 * @name webUiApp
 * @description
 * # webUiApp
 *
 * Main module of the application.
 */
angular
  .module('webUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule'
  ])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
  }])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/guideline/:guidelineId', {
        templateUrl: 'views/guideline.html',
        controller: 'GuidelineCtrl'
      })
      .when('/author/:authorId', {
        templateUrl: 'views/author.html',
        controller: 'AuthorCtrl'
      })
      .when('/section/:sectionId', {
        templateUrl: 'views/section.html',
        controller: 'SectionCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

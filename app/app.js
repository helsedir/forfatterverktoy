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
        'ngSanitize',
        'ngTouch',
        'ui.sortable',
        'LocalStorageModule',
        'toastr',
        'ui.router.state',
        'ncy-angular-breadcrumb',
        'angularModalService',
        'ui.bootstrap',
        'angular-redactor'
    ])
    .config(['redactorOptions', function (redactorOptions){
        redactorOptions.buttonSource = true;
        redactorOptions.minHeight = 200;
        redactorOptions.buttons = [ 'html', 'formatting', 'bold', 'italic', 'underline',
        'unorderedlist', 'orderedlist', 'link'];
        redactorOptions.formatting = ['p', 'h1', 'h2', 'h3', 'h4'];
        redactorOptions.plugins = ['table', 'classHack'];
        redactorOptions.cleanOnPaste = true;
        redactorOptions.toolbarFixed = false;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }])
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
    }])
    .config(['$breadcrumbProvider', function($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            prefixStateName: 'home',
            template: '<ol class="breadcrumb">' +
                '<li ng-repeat="step in steps | limitTo:(steps.length-1)"><a href="{{step.ncyBreadcrumbLink}}{{$scope.parentId}}">{{step.ncyBreadcrumbLabel}}</a></li>' +
                '<li ng-repeat="step in steps | limitTo:-1" class="active"><span>{{step.ncyBreadcrumbLabel}}</span></li>' +
                '</ol>'
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'components/guidelines/guidelines.html',
                controller:'GuidelinesCtrl',
                data: {
                    ncyBreadcrumbLabel: 'Retningslinjer'
                }
            })
            .state({
                name: 'guideline',
                url: '/guideline/{guidelineId}',
                templateUrl: 'components/guidelines/guideline/guideline.html',
                controller: 'GuidelineCtrl',

                data: {
                    ncyBreadcrumbLabel: 'Retningslinje {{guidelineLabel}}'
                }
            })
            .state('section', {
                url: '/guideline/{guidelineId}/section/{sectionId}',
                views: {
                    "@" : {
                        templateUrl: 'components/guidelines/guideline/section/section.html',
                        controller: 'SectionCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'guideline',
                    ncyBreadcrumbLabel: 'Seksjon {{sectionLabel}}'
                }
            })
            .state('recommendation', {
                url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}',
                views: {
                    "@" : {
                        templateUrl: 'components/guidelines/guideline/section/recommendation/recommendation.html',
                        controller: 'RecommendationCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent:'section' ,
                    ncyBreadcrumbLabel: 'Anbefaling {{recommendationLabel}}'
                }
            })
            .state('author', {
                url: '/author',
                views: {
                    "@" : {
                        templateUrl: 'components/author/author.html',
                        controller: 'AuthorCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbLabel: 'Forfatter'

                }
            })
            .state('pico', {
                url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/pico/{picoId}',
                views: {
                    "@" : {
                        templateUrl: 'components/guidelines/guideline/section/recommendation/pico/pico.html',
                        controller: 'PicoCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'recommendation',
                    ncyBreadcrumbLabel: 'Pico'
                }
            })
            .state('picooutcome', {
                url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/pico/{picoId}/picooutcome/{picoOutcomeId}',
                views: {
                    "@" : {
                        templateUrl: 'components/guidelines/guideline/section/recommendation/pico/picooutcome/picoOutcome.html',
                        controller: 'PicoOutcomeCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'pico',
                    ncyBreadcrumbLabel: 'Pico outcome'
                }
            })
            .state('picoCode', {
                url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/pico/{picoId}/picoCode/{picoCodeId}',
                views: {
                    "@" : {
                        templateUrl: 'components/guidelines/guideline/section/recommendation/pico/picocode/picocode.html',
                        controller: 'PicocodeCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'pico',
                    ncyBreadcrumbLabel: 'Pico kode'
                }
            })
            .state('taxonomyCode', {
                url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/pico/{picoId}/picoCode/{picoCodeId}/taxonomyCode/{taxonomyCodeId}',
                views: {
                    "@" : {
                        templateUrl: 'components/guidelines/guideline/section/recommendation/pico/picocode/taxonomycode/taxonomycode.html',
                        controller: 'TaxonomycodeCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'picoCode',
                    ncyBreadcrumbLabel: 'Taxonomy kode'
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    "@" : {
                        templateUrl: 'common/login.html',
                        controller: 'LoginCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbLabel: 'Login'
                }
            })
            .state('register', {
                url: '/register',
                views: {
                    "@" : {
                        templateUrl: 'common/register.html',
                        controller: 'RegisterCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbLabel: 'Register'
                }
            })
            .state('emrinfo', {
                url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/emrinfo/{emrInfoId}',
                views: {
                    "@" : {
                        templateUrl: 'components/guidelines/guideline/section/recommendation/emrinfo/emrInfo.html',
                        controller: 'EmrInfoCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'recommendation',
                    ncyBreadcrumbLabel: 'Emr Info'
                }
            })
            .state('keyinfo', {
                url: '/guideline/{guidelineId}/section/{sectionId}/recommendation/{recommendationId}/keyinfo/{keyInfoId}',
                views: {
                    "@" : {
                        templateUrl: 'components/guidelines/guideline/section/recommendation/keyinfo/keyInfo.html',
                        controller: 'KeyInfoCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'recommendation',
                    ncyBreadcrumbLabel: 'Key Info'
                }
            })
            
            .state('reference', {
                url: '/reference',
                views: {
                    "@" : {
                        templateUrl: 'components/reference/reference.html',
                        controller: 'ReferenceCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbLabel: 'Referanse'
                }
            });

        $urlRouterProvider.otherwise('/');

    }])
    .value('apiUrl', 'http://localhost:50500/api/v1/');

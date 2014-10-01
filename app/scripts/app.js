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
        'textAngular',
        'ui.router.state',
        'ncy-angular-breadcrumb'
    ])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }])
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
    }])
    .config(function($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            prefixStateName: 'home',
            template: '<ol class="breadcrumb">' +
                '<li ng-repeat="step in steps | limitTo:(steps.length-1)"><a href="{{step.ncyBreadcrumbLink}}{{$scope.parentId}}">{{step.ncyBreadcrumbLabel}}</a></li>' +
                '<li ng-repeat="step in steps | limitTo:-1" class="active"><span>{{step.ncyBreadcrumbLabel}}</span></li>' +
                '</ol>'
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/main.html',
                controller:'MainCtrl',
                data: {
                    ncyBreadcrumbLabel: 'Retningslinjer'
                }
            })
            .state({
                name: 'guideline',
                url: '/guideline/{guidelineId}',
                templateUrl: 'views/guideline.html',
                controller: 'GuidelineCtrl',

                data: {
                    ncyBreadcrumbLabel: 'Retningslinje {{guideline.guidelineId}}'
                }
            })
            .state('section', {
                url: '/section/{sectionId}',
                views: {
                    "@" : {
                        templateUrl: 'views/section.html',
                        controller: 'SectionCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'guideline',
                    ncyBreadcrumbLabel: 'Seksjon {{section.sectionId}}'
                }
            })
            .state('recommendation', {
                url: '/recommendation/{recommendationId}',
                views: {
                    "@" : {
                        templateUrl: 'views/recommendation.html',
                        controller: 'RecommendationCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent:'section' ,
                    ncyBreadcrumbLabel: 'Anbefalling {{recommendation.recommendationId}}'
                }
            })
            .state('author', {
                url: '/author/{authorId}',
                views: {
                    "@" : {
                        templateUrl: 'views/author.html',
                        controller: 'AuthorCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbLabel: 'Author {{author.authorId}}'
                }
            })
            .state('pico', {
                url: '/pico/{picoId}',
                views: {
                    "@" : {
                        templateUrl: 'views/pico.html',
                        controller: 'PicoCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'recommendation',
                    ncyBreadcrumbLabel: 'Pico {{pico.picoId}}'
                }
            })
            .state('picoCode', {
                url: '/picoCode/{picoCodeId}',
                views: {
                    "@" : {
                        templateUrl: 'views/picocode.html',
                        controller: 'PicocodeCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'pico',
                    ncyBreadcrumbLabel: 'Pico kode {{picoCode.picoCodeId}}'
                }
            })
            .state('taxonomyCode', {
                url: '/taxonomyCode/{taxonomyCodeId}',
                views: {
                    "@" : {
                        templateUrl: 'views/taxonomycode.html',
                        controller: 'TaxonomycodeCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'picoCode',
                    ncyBreadcrumbLabel: 'Taxonomy kode {{taxonomyCode.taxonomyCodeId}}'
                }
            })
            .state('addAuthor', {
                url: '/addAuthor',
                views: {
                    "@" : {
                        templateUrl: 'views/addauthor.html',
                        controller: 'AddauthorCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbLabel: 'Add author'
                }
            })
            .state('about', {
                url: '/about',
                views: {
                    "@" : {
                        templateUrl: 'views/about.html',
                        controller: 'AboutCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbLabel: 'Om '
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    "@" : {
                        templateUrl: 'views/login.html',
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
                        templateUrl: 'views/register.html',
                        controller: 'RegisterCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbLabel: 'Register'
                }
            })
            .state('emrinfo', {
                url: '/emrinfo/{emrInfoId}',
                views: {
                    "@" : {
                        templateUrl: 'views/emrInfo.html',
                        controller: 'EmrInfoCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'recommendation',
                    ncyBreadcrumbLabel: 'Emr Info {{emrinfo.emrInfoId}}'
                }
            })
            .state('keyinfo', {
                url: '/keyinfo/{keyInfoId}',
                views: {
                    "@" : {
                        templateUrl: 'views/keyInfo.html',
                        controller: 'KeyInfoCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'recommendation',
                    ncyBreadcrumbLabel: 'Key Info {{keyinfo.keyInfoId}}'
                }
            })
            .state('picocontinousoutcome', {
                url: '/picocontinousoutcome/{picoContinousOutcomeId}',
                views: {
                    "@" : {
                        templateUrl: 'views/picoContinousOutcome.html',
                        controller: 'PicoContinousOutcomeCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'pico',
                    ncyBreadcrumbLabel: 'Pico continuous outcome {{picocontinousoutcome.picoContinousOutcomeId}}'
                }
            })
            .state('picooutcome', {
                url: '/picooutcome/{picoOutcomeId}',
                views: {
                    "@" : {
                        templateUrl: 'views/picoOutcome.html',
                        controller: 'PicoOutcomeCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'pico',
                    ncyBreadcrumbLabel: 'Pico outcome {{picooutcome.picoOutcomeId}}'
                }
            })
            .state('reference', {
                url: '/reference/{referenceId}',
                views: {
                    "@" : {
                        templateUrl: 'views/reference.html',
                        controller: 'ReferenceCtrl'
                    }
                },
                data: {
                    ncyBreadcrumbParent: 'recommendation',
                    ncyBreadcrumbLabel: 'Referense {{reference.referenceId}}'
                }
            })
        ;

        $urlRouterProvider.otherwise('/');

    })
;

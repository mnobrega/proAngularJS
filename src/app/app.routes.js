'use strict';

angular.module('proangularjs',['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "shared/layout/content.html"
            })
            .state('index.main', {
                url: "/main",
                templateUrl: "app/main/main.html",
                data: { pageTitle: 'Example view' }
            })
        $urlRouterProvider.otherwise('/index/main');
    })
;
'use strict';

angular.module('proangularjs',['ui.router','ui.bootstrap'])
    .config(function($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('index',{
                abstract: true,
                url : "/index",
                templateUrl: "components/layout/content.html"
            })
            .state('index.main', {
                url : "/main",
                templateUrl: "app/main/main.tpl.html",
                data: {pageTitle:'Example'}
            });

        $urlRouterProvider.otherwise('/index/main');
    })
;
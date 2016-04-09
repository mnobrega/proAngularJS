'use strict';

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap','gettext','customFilters'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "app/common/content.html"
        })
        .state('dashboards_top', {
            abstract: true,
            url: "/dashboards_top",
            templateUrl: "app/common/content_top_navigation.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "app/main/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('dashboards_top.dashboard_4', {
            url: "/dashboard_4",
            templateUrl: "app/dashboard/dashboard_4.html",
            data: { pageTitle: 'Dashboard' }
        })
        .state('index.products',{
            url: "/products",
            templateUrl: "app/sportstore/products.tpl.html",
            data: { pageTitle: 'Sportstore Products'}
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "app/minor/minor.html",
            data: { pageTitle: 'Example view' }
        });

    $urlRouterProvider.otherwise('/index/main');
  })
;

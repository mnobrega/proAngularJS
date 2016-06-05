'use strict';

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router',
    'ui.bootstrap','gettext','customFilters','cart','cap9','cap10','cap11','cap12'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "app/common/content.html"
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "app/main/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "app/minor/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.products',{
            url: "/products",
            templateUrl: "app/sportstore/products.tpl.html"
        })
        .state('index.products.list',{
            url: "/list",
            templateUrl: "app/sportstore/productsList.tpl.html"
        })
        .state('index.products.checkout',{
            url: "/checkout",
            templateUrl: "app/sportstore/productsCheckout.tpl.html"
        })
        .state('index.products.placeorder',{
            url: "/placeorder",
            templateUrl:"app/sportstore/productsPlaceOrder.tpl.html"
        })
        .state('index.products.complete',{
            url: "/complete",
            templateUrl:"app/sportstore/productsThankYou.tpl.html"
        })
        .state('index.admin',{
            url: "/admin",
            templateUrl:"app/sportstoreAdmin/adminMain.tpl.html"
        })
        .state('index.admin.products',{
            url: "/products",
            templateUrl:"app/sportstoreAdmin/adminProducts.tpl.html"
        })
        .state('index.admin.orders',{
            url: "/orders",
            templateUrl:"app/sportstoreAdmin/adminOrders.tpl.html"
        })
        .state('index.cap9',{
            url: "/cap9",
            templateUrl:"app/cap9/exampleCap9.tpl.html"
        })
        .state("index.cap10",{
            url: "/cap10",
            templateUrl:"app/cap10/cap10.tpl.html"
        })
        .state('index.cap11', {
            url: "/cap11",
            templateUrl: "app/cap11/cap11.tpl.html"
        })
        .state('index.cap12', {
            url: "/cap12",
            templateUrl: "app/cap12/cap12.tpl.html"
        })
        .state('login',{
            url: "/login",
            templateUrl:"app/sportstoreAdmin/adminLogin.tpl.html"
        });

    $urlRouterProvider.otherwise('/login');
  })
;

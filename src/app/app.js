'use strict';

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap','gettext','customFilters','cart'])
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
        .state('index.products.thankyou',{
            url: "/thankyou",
            templateUrl:"app/sportstore/productsThankYou.tpl.html"
        });

    $urlRouterProvider.otherwise('/index/main');
  })
;

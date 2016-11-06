'use strict';

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router',
    'ui.bootstrap','gettext','customFilters','cart','cap9','cap10','cap11','cap12','cap13', 'cap14','cap15',
    'cap16', 'cap17','cap18','cap19',"cap20"])
  .config(function ($stateProvider, $urlRouterProvider,$anchorScrollProvider,$interpolateProvider, $locationProvider) {

      if (window.history && history.pushState) {
          $locationProvider.html5Mode({
              enabled: false,
              requireBase: false
          });
      }

      //disable auto scrolling
      //$anchorScrollProvider.disableAutoScrolling();

      //change interpolation symbols
      //$interpolateProvider.startSymbol("!!");
      //$interpolateProvider.endSymbol("!!");

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
        .state('index.cap13', {
            url: "/cap13",
            templateUrl: "app/cap13/cap13.tpl.html"
        })
        .state('index.cap14', {
            url: "/cap14",
            templateUrl: "app/cap14/cap14.tpl.html"
        })
        .state('index.cap15', {
            url: "/cap15",
            templateUrl: "app/cap15/cap15.tpl.html"
        })
        .state('index.cap16', {
            url: "/cap16",
            templateUrl: "app/cap16/cap16.tpl.html"
        })
        .state('index.cap17', {
            url: "/cap17",
            templateUrl: "app/cap17/cap17.tpl.html"
        })
        .state('index.cap18', {
            url: "/cap18",
            templateUrl: "app/cap18/cap18.tpl.html"
        })
        .state('index.cap19', {
            url: "/cap19",
            templateUrl: "app/cap19/cap19.tpl.html"
        })
        .state('index.cap20', {
            url: "/cap20",
            templateUrl: "app/cap20/cap20.tpl.html"
        })
        .state('login',{
            url: "/login",
            templateUrl:"app/sportstoreAdmin/adminLogin.tpl.html"
        });

    $urlRouterProvider.otherwise('/login');

  })
;

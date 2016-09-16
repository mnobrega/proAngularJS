'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('inspinia')
    .directive('unorderedList', function() {
        return function (scope, element, attrs) {
            var data = scope[attrs["unorderedList"]];
            var propertyExpression = attrs["listProperty"];

            if (angular.isArray(data)) {
                var listElem = angular.element("<ul>");
                element.append(listElem);
                for (var i = 0; i < data.length; i++) {
                    (function() {
                        var itemElement = angular.element('<li>');
                        listElem.append(itemElement);
                        var index = i;
                        var watcherFn = function(watchScope) {
                            return watchScope.$eval(propertyExpression, data[index]);
                        };
                        scope.$watch(watcherFn, function(newValue, oldValue) {
                            itemElement.text(newValue);
                        });
                    }());

                }
            }
        }
    })
    .directive('sideNavigation', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call metsi to build when user signup
                scope.$watch('authentication.user', function() {
                    $timeout(function() {
                        element.metisMenu();
                    });
                });

            }
        }
    })
    .directive('minimalizaSidebar', function ($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope, $element) {
                $scope.minimalize = function () {
                    angular.element('body').toggleClass('mini-navbar');
                    if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        angular.element('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function () {
                            angular.element('#side-menu').fadeIn(400);
                        }, 200);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        angular.element('#side-menu').removeAttr('style');
                    }
                };
            }
        };
    })
    .directive("highlight",function($filter) {

        var dayFilter = $filter("dayName");

        return function (scope, element, attrs) {
            if (dayFilter(scope.day) == attrs["highlight"]) {
                element.css("color", "red");
            }}
    });



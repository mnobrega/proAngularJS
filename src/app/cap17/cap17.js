angular.module("cap17",["cap17.controllers","cap17.directives"]);

angular.module("cap17.controllers",[])
    .controller("cap17Ctrl4", function($scope) {
        $scope.dataValue = "Not Sure";
    })
    .controller("cap17Ctrl3", function($scope) {
        $scope.products = [
            {name: "Apples", price: 1.20, quantity: 2},
            {name: "Bananas", price: 2.42, quantity: 3},
            {name: "Pears", price: 2.02, quantity: 1}
        ];
    })
    .controller("cap17Ctrl2", function($scope) {
        $scope.products = [
            {name: "Apples", price: 1.20},
            {name: "Bananas", price: 2.42},
            {name: "Pears", price: 2.02}
        ];

        $scope.changeData = function() {
            $scope.products.push({name: "Cherries", price: 4.02});
            for(var i = 0; i < $scope.products.length; i++) {
                $scope.products[i].price++;
            }
        }
    })
    .controller("cap17Ctrl1", function($scope) {
        $scope.dataSource = "controller";
    });

angular.module("cap17.directives",[])
    .directive("triButton", function() {
        return {
            restrict: "E",
            replace: true,
            require: "ngModel",
            template: angular.element(document.querySelector("#cap17TriTemplate")).html(),
            link: function (scope, element, attrs, ctrl) {

                var validateParser = function(value){
                    var valid = (value == "Yes" || value == "No");
                    ctrl.$setValidity("confidence",valid);
                    return valid ? value : undefined;
                };

                ctrl.$parsers.push(validateParser);

                element.on("click", function(event) {
                    setSelected(event.target.innerText);
                    scope.$apply(function () {
                        ctrl.$setViewValue(event.target.innerText);
                    });
                });

                var setSelected = function(value) {
                    var buttons = element.find("button");
                    buttons.removeClass("btn-primary");
                    for (var i = 0; i < buttons.length; i++) {
                        if (buttons.eq(i).text() == value) {
                            buttons.eq(i).addClass("btn-primary");
                        }
                    }
                };

                ctrl.$formatters.push(function (value) {
                   return value == "Huh?" ? "Not Sure" : value;
                });

                ctrl.$render = function() {
                    setSelected(ctrl.$viewValue || "Not Sure");
                }

            }
        }
    })
    .directive("resetTotals", function() {
        return {
            scope: {
                data: "=productData",
                propname: "@propertyName"
            },
            template: angular.element(document.querySelector("#cap17ResetTemplate")).html(),
            require: "^productTable", /* use productTable */
            link: function (scope, element, attrs, ctrl) {
                scope.reset = function() {
                    for (var i = 0; i < scope.data.length; i++) {
                        scope.data[i][scope.propname] = 0;
                    }
                    ctrl.updateTotal();
                }
            }
        }
    })
    .directive("productItem", function() {
        return {
            template: angular.element(document.querySelector("#cap17ProductTemplate")).html(),
            require: "^productTable", /* use productTable */
            link: function (scope, element, attrs, ctrl) {
                scope.$watch("item.quantity", function() {
                    ctrl.updateTotal();
                });
            }
        }
    })
    .directive("productTable",function() {
        return {
            transclude: true,
            scope: {
                value: "=productTable",
                data: "=productData"
            },
            controller: function ($scope, $element, $attrs) {
                this.updateTotal = function() {
                    var total = 0;
                    for (var i=0; i < $scope.data.length; i++) {
                        total += Number($scope.data[i].quantity);
                    }
                    $scope.value = total;
                }
            }
        }
    })
    .directive("panel", function() {
        return {
            link: function(scope, element, attrs) {
                scope.dataSource = "directive";
            },
            restrict : "E", /* element */
            scope: true, /* false to disconnect the directive from the controller */
            template: function() {
                return angular.element(
                    document.querySelector("#cap17transclusion")).html();
            },
            transclude: true  /* false to not transclude */
        }
    });
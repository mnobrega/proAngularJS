angular.module("cap19",["cap19.controllers","cap19.directives","cap19.services"]);

angular.module("cap19.controllers",[])
    .config(function($locationProvider, $anchorScrollProvider) {
        if (window.history && history.pushState) {
            $locationProvider.html5Mode({
                enabled: false,
                requireBase: false
            });
        }

        $anchorScrollProvider.disableAutoScrolling(); //disable auto scrolling
    })
    .controller("cap19Ctrl11", function($scope) {
        $scope.dataValue = "100.23";
    })
    .controller("cap19Ctrl10", function($scope) {
        $scope.price = "100.23";
    })
    .controller("cap19Ctrl9", function($scope, $sanitize) {
        $scope.dangerousData = "<p>This is <b onmouseover=alert('Attack!')>dangerous</b> data</p>";
        $scope.$watch("dangerousData", function(newValue) {
            $scope.htmlData = $sanitize(newValue);
        })
    })
    .controller("cap19Ctrl8", function($scope, $sce) {
        $scope.htmlData = "<p>This is <b onmouseover=alert('Attack!')>dangerous</b> data</p>";

        $scope.$watch("htmlData", function(newValue) {
            $scope.trustedData = $sce.trustAsHtml(newValue);
        })
    })
    .controller("cap19Ctrl7", function($scope, $exceptionHandler) {
        $scope.throwEx = function() {
            try {
                throw new Error("Triggered Exception");
            } catch (ex) {
                $exceptionHandler(ex, "Button Click");
            }

        }
    })
    .controller("cap19Ctrl6", function($scope) {
        $scope.data = {
            cities: ["London","New York","Paris","Lisbon","Porto"],
            totalClicks: 0
        };
    })
    .controller("cap19Ctrl5", function($scope, $location, $anchorScroll){
        $scope.itemCount = 50;
        $scope.items = [];

        for (var i=0; i < $scope.itemCount; i++) {
            $scope.items[i] = "Item "+i;
        }

        $scope.show = function(id) {
            $location.hash(id);
            if (id == "bottom") {
                $anchorScroll();
            }
        }
    })
    .controller("cap19Ctrl4", function($scope, $location) {
        $scope.$on("$locationChangeSuccess", function(event, newUrl) {
            $scope.url = newUrl;
        });

        $scope.setUrl = function(component) {
            switch (component) {
                case "reset":
                    $location.hash("");
                    $location.search("");
                    break;
                case "path":
                    $location.path("/index/cap18");
                    break;
                case "hash":
                    $location.hash("north");
                    break;
                case "search":
                    $location.search("select","hotels");
                    break;
                case "url":
                    $location.url("/index/cap19?select=hotels#north");
                    break;
            }
        }
    })
    .controller("cap19Ctrl3", function($scope, $interval) {
        $interval(function() {
            $scope.time = new Date().toTimeString();
        },2000);
    })
    .controller("cap19Ctrl2", function($scope, $window, $document) {
        $document.find("button#cap19Ctrl2Button").on("click", function(event) {
            $window.alert("cap19Ctrl2 msg: " + event.target.innerText);
        });
    })
    .controller("cap19Ctrl1", function($scope, $window) {
        $scope.displayAlert = function(msg) {
            $window.alert("cap19Ctrl1 msg: " + msg);
        };
    });

angular.module("cap19.directives",[])
    .directive("evalExpression2", function($parse) {
        var expressionFn = $parse("total | currency");
        return {
            scope: {
                amount: "=amount",
                tax: "=tax"
            },
            link: function(scope, element, attrs) {
                scope.$watch("amount", function(newValue) {
                    var localData = {
                        total: Number(newValue) + (Number(newValue) * (Number(scope.tax)/100))
                    };
                    element.text(expressionFn(scope, localData));
                });
            }
        }
    })
    .directive("evalExpression", function($parse) {
        return function(scope, element, attrs) {
            scope.$watch(attrs["evalExpression"], function(newValue) {
                try {
                    var expressionFn = $parse(scope.expr);
                    var result = expressionFn(scope);
                    if (result == undefined) {
                        result = "No result";
                    }
                } catch (err) {
                    result = "Cannot evalute expression";
                }
                element.text(result);
            });
        }
    })
    .directive ("multiButtonCap19", function(logServiceProviderCap19,logServiceCap19) {
        return {
            scope: { counter: "=counter"},
            link: function(scope, element, attrs) {
                element.on("click", function(event) {
                    logServiceProviderCap19.log("Button click: " + event.target.innerText);
                    logServiceCap19.log("Teste");
                    scope.$apply(function() {
                        scope.counter++;
                    })
                })
            }
        }
    });

angular.module("cap19.services",[])
    .factory("$exceptionHandler", function($log) {
        return function(exception, cause) {
            $log.error("Message: " + exception.message + " (Cause: " + cause + ")");
        }
    })
    .factory("logServiceCap19", function($log) {
        var messageCount = 0;
        return {
            log: function(msg) {
                $log.log("LOG + " + this.messageCount++ + ")" + msg);
            }
        };
    })
    .provider("logServiceProviderCap19", function() {
        var counter = true;
        var debug = true;
        return {
            $get: function($log) {
                return {
                    messageCount : 0,
                    log: function(msg){
                        if (debug) {
                            $log.log("(Provider LOG (cap19)"
                                + (counter ? " + " + this.messageCount++ + ") " : ") ")
                                + msg);
                        }
                    }
                };
            },
            messageCounterEnabled: function(setting) {
                if (angular.isDefined(setting)) {
                    counter = setting;
                    return this;
                } else {
                    return counter;
                }
            },
            debugEnabled: function (setting) {
                if (angular.isDefined(setting)) {
                    debug = setting;
                    return this;
                } else {
                    return debug;
                }
            }
        }
    });
angular.module("cap20",["cap20.controllers","cap20.directives"]);

angular.module("cap20.controllers",[])
    .controller("cap20Ctrl2", function($scope) {

    })
    .controller("cap20Ctrl1", function($scope, $http) {

        $scope.sendXMLData = function() {
            var config = {
                headers: {
                    "content-type":"application/xml"
                },
                transformRequest: function(data, headers) {
                    var rootElem = angular.element("<xml>");
                    for (var i=0; i<data.length; i++) {
                        var prodElem = angular.element("<product>");
                        prodElem.attr("name",data[i].name);
                        prodElem.attr("category",data[i].category);
                        prodElem.attr("price",data[i].price);
                        rootElem.append(prodElem);
                    }
                    rootElem.children().wrap("<products>").html();
                    return rootElem.html();
                }
            };

            $http.post("app/cap20/ajax.html", $scope.products ,config);
        };

        $scope.loadJSONData = function() {
            $http.get("app/cap20/productData.json").then(function(response) {
                console.log("Status: "+response.status);
                console.log("Type: "+response.headers("content-type"));
                console.log("Length: "+ response.headers("content-length"));
                console.log(response);
                $scope.products = response.data;
            });
        };

        $scope.loadXMLData = function () {
            $http.get("app/cap20/productData.xml").then(function(response) {
                $scope.products = [];
                var productElems = angular.element(response.data.trim()).find("product");
                for (var i = 0; i < productElems.length; i++) {
                    var product = productElems.eq(i);
                    $scope.products.push({
                        name: product.attr("name"),
                        category: product.attr("category"),
                        price: product.attr("price")
                    });
                }
            });
        };

        $scope.loadXMLDataWithTransform = function(){
            var config = {
                transformResponse: function(data, headers) {
                    if (headers("content-type") == "application/xml" && angular.isString(data)) {
                        products = [];
                        var productElems = angular.element(data.trim()).find("product");
                        for (var i = 0; i < productElems.length; i++) {
                            var product = productElems.eq(i);
                            products.push({
                                name : product.attr("name"),
                                category: product.attr("category"),
                                price: product.attr("price")
                            });
                        }
                        return products;
                    } else {
                        return data;
                    }
                }
            };

            $http.get("app/cap20/productData.xml", config).success(function(data){
                $scope.products = data;
            });
        }
    });
angular.module("cap20.directives",[])
    .directive("promiseWorker2", function($q) {
        var deferred = [$q.defer(), $q.defer()];
        var promises = [deferred[0].promise, deferred[1].promise];
        return {
            link: function (scope, element, attrs) {
                element.find("button").on("click", function (event) {
                    var buttonText = event.target.innerText;
                    var buttonGroup = event.target.getAttribute("data-group");
                    if (buttonText == "Abort") {
                        deferred[buttonGroup].reject("Aborted");
                    } else {
                        deferred[buttonGroup].resolve(buttonText);
                    }
                });
            },
            controller: function ($scope, $element, $attrs) {
                this.promise = $q.all(promises).then(function (results) {
                    return results.join();
                })
            }
        }
    })
    .directive("promiseObserver2", function() {
        return {
            require: "^promiseWorker2",
            link: function(scope, element, attrs, ctrl) {
                ctrl.promise.then(function(result) {
                    element.text(result);
                }, function(reason) {
                    element.text(reason);
                });
            }
        }
    })
    .directive("promiseObserver", function() {
        return {
            require: "^promiseWorker",
            link: function(scope, element, attrs, ctrl) {
                ctrl.promise.then(function(result) {
                    element.text(result);
                }, function(reason) {
                    element.text("Fail ("+reason+")");
                });
            }
        }
    })
    .directive("promiseWorker", function($q) {
        var deferred = $q.defer();
        return {
            link: function(scope, element, attrs) {
                element.find("button").on("click", function(event) {
                    var buttonText = event.target.innerText;
                    if (buttonText == "Abort") {
                        deferred.reject("Aborted");
                    } else {
                        deferred.resolve(buttonText);
                    }
                });
            },
            controller: function($scope, $element, $attrs) {
                this.promise = deferred.promise;
            }
        }
    });
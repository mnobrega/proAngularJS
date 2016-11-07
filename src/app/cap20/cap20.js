angular.module("cap20",["cap20.controllers"]);

angular.module("cap20.controllers",[])
    .controller("cap20Ctrl1", function($scope, $http) {
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
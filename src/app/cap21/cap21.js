angular.module("cap21",["cap21.controllers","cap21.services"]);

angular.module("cap21.controllers",[])
    .constant("baseUrl","http://localhost:2403/products/")
    .controller("cap211Ctrl", function($scope, $http, baseUrl) {

        $scope.displayMode = "list";
        $scope.currentProduct = null;


        $scope.createProduct = function(product) {
            $scope.products.push(product);
            $scope.displayMode = "list";
        };

        $scope.createAPIProduct = function(product) {
            $http.post(baseUrl, product).success(function (newProduct) {
                $scope.APIProducts.push(newProduct);
                $scope.displayMode = "list";
            });
        };

        $scope.readProducts = function () {
            $scope.products = [
                {id:0, name:"Dummy",category:"Test",price:1.25},
                {id:1, name:"Dummy2", category:"Test",price:2.45}
            ];
        };

        $scope.readAPIProducts = function () {
            $http.get(baseUrl).success(function(data) {
                $scope.APIProducts = data;
            })
        };

        $scope.updateProduct = function(product) {
            for(var i= 0; i <$scope.products.length ; i++) {
                if ($scope.products[i].id == product.id){
                    $scope.products[i] = product;
                    break;
                }
            }
            $scope.displayMode = "list"
        };

        $scope.updateAPIProduct = function(product) {
            $http({
                url: baseUrl + product.id,
                method: "PUT",
                data: product
            }).success(function(modifiedProduct) {
                for (var i=0; i < $scope.APIProducts.length; i++) {
                    if ($scope.products[i].id == modifiedProduct.id) {
                        $scope.products[i] = modifiedProduct;
                    }
                }
                $scope.displayMode = "list";
            })
        }

        $scope.deleteProduct = function(product) {
            $scope.products.splice($scope.products.indexOf(product),1);
        };

        $scope.deleteAPIProduct = function (product) {
            $http({
                method: "DELETE",
                url: baseUrl + product.id
            }).success(function() {
               $scope.APIProducts.splice($scope.APIProducts.indexOf(product),1);
            });
        };

        //views
        $scope.editOrCreateProduct = function(product) {
            $scope.currentProduct = product ? angular.copy(product) : {};
            $scope.displayMode = "edit";
        };

        $scope.saveEdit = function(product) {
            if (angular.isDefined(product.id)) {
                $scope.updateProduct(product);
            } else {
                $scope.createProduct(product);
            }
        };

        $scope.cancelEdit = function() {
            $scope.currentProduct = {};
            $scope.displayMode = "list";
        };

        $scope.readProducts();
        $scope.readAPIProducts();

    });

angular.module("cap21.services",[]);